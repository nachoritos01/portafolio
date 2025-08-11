#!/bin/bash

# =============================================================================
# REFINE-HU: Generador Automático de Documentación de Refinamiento de HU
# =============================================================================
# 
# Descripción: Script que automatiza la creación de documentación completa
#              para el refinamiento de Historias de Usuario basado en el 
#              contexto del proyecto TEC.Sandbox
#
# Uso: ./refine-hu.sh
#
# Autor: TEC.Sandbox Team
# Fecha: $(date +%Y-%m-%d)
# =============================================================================

set -euo pipefail  # Modo estricto para manejo de errores

# Colores para output
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly PURPLE='\033[0;35m'
readonly CYAN='\033[0;36m'
readonly NC='\033[0m' # No Color

# Configuración
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly CLAUDE_DIR="${SCRIPT_DIR}/.claude"
readonly DOCS_DIR="${SCRIPT_DIR}/docs"
readonly TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# =============================================================================
# FUNCIONES UTILITARIAS
# =============================================================================

log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
    exit 1
}

print_header() {
    echo -e "${PURPLE}"
    echo "╔════════════════════════════════════════════════════════════════╗"
    echo "║               TEC.SANDBOX - REFINAMIENTO DE HU                ║"
    echo "║        Generador Automático de Documentación Técnica          ║"
    echo "╚════════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

# =============================================================================
# VALIDACIONES
# =============================================================================

validate_environment() {
    log_info "Validando entorno del proyecto..."
    
    # Verificar que existe .claude/
    if [[ ! -d "$CLAUDE_DIR" ]]; then
        log_error "No se encontró la carpeta .claude/ en el directorio actual. Ejecute desde la raíz del proyecto."
    fi
    
    # Verificar archivos críticos de contexto
    local required_files=(
        "README.md"
        "architecture.md"
        "domain.md"
        "conventions.md"
        "rules/angular.md"
        "rules/typescript.md"
    )
    
    for file in "${required_files[@]}"; do
        if [[ ! -f "${CLAUDE_DIR}/${file}" ]]; then
            log_warning "Archivo de contexto faltante: .claude/${file}"
        fi
    done
    
    # Crear directorio docs si no existe
    mkdir -p "$DOCS_DIR"
    
    log_success "Entorno validado correctamente"
}

# =============================================================================
# RECOPILACIÓN DE CONTEXTO
# =============================================================================

read_claude_context() {
    log_info "Analizando contexto del proyecto desde .claude/..."
    
    local context=""
    
    # Leer todos los archivos .md de .claude recursivamente
    while IFS= read -r -d '' file; do
        local relative_path="${file#$CLAUDE_DIR/}"
        context+="

## CONTEXTO: ${relative_path}
\`\`\`
$(cat "$file" 2>/dev/null || echo "Error leyendo archivo")
\`\`\`
"
    done < <(find "$CLAUDE_DIR" -name "*.md" -type f -print0)
    
    echo "$context"
}

# =============================================================================
# ENTRADA DE USUARIO
# =============================================================================

get_user_input() {
    echo
    log_info "Iniciando proceso de refinamiento de Historia de Usuario..."
    echo
    
    # Solicitar nombre de HU
    while true; do
        echo -e "${CYAN}📝 Ingresa el nombre de la Historia de Usuario:${NC}"
        echo -e "${YELLOW}   (Se usará como nombre de carpeta - sin espacios, usar guiones)${NC}"
        read -r hu_name
        
        # Validar y limpiar nombre
        hu_name=$(echo "$hu_name" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9-]/-/g' | sed 's/--*/-/g' | sed 's/^-\|-$//g')
        
        if [[ -n "$hu_name" ]]; then
            break
        else
            log_warning "El nombre no puede estar vacío. Intenta de nuevo."
        fi
    done
    
    # Verificar si la carpeta ya existe
    local hu_dir="${DOCS_DIR}/${hu_name}"
    if [[ -d "$hu_dir" ]]; then
        echo -e "${YELLOW}⚠️  La carpeta '${hu_name}' ya existe.${NC}"
        echo -e "${CYAN}¿Deseas sobrescribirla? (s/N):${NC}"
        read -r overwrite
        if [[ ! "$overwrite" =~ ^[Ss]$ ]]; then
            log_error "Operación cancelada por el usuario."
        fi
        rm -rf "$hu_dir"
    fi
    
    echo
    
    # Solicitar texto de HU
    echo -e "${CYAN}📋 Ingresa el texto completo de la Historia de Usuario:${NC}"
    echo -e "${YELLOW}   (Puedes usar múltiples líneas. Presiona Ctrl+D cuando termines)${NC}"
    echo -e "${YELLOW}   Formato sugerido: Como [rol], quiero [funcionalidad] para [beneficio]${NC}"
    echo
    
    hu_text=""
    while IFS= read -r line; do
        hu_text+="$line"$'\n'
    done
    
    if [[ -z "$hu_text" ]]; then
        log_error "El texto de la HU no puede estar vacío."
    fi
    
    export HU_NAME="$hu_name"
    export HU_TEXT="$hu_text"
    export HU_DIR="$hu_dir"
}

# =============================================================================
# GENERADORES DE CONTENIDO
# =============================================================================

generate_readme() {
    cat > "${HU_DIR}/README.md" << EOF
# Historia de Usuario: $HU_NAME

**Fecha de creación**: $TIMESTAMP  
**Estado**: En refinamiento  
**Sprint**: TBD  

## 📋 Historia de Usuario

$HU_TEXT

## 📁 Documentos de Refinamiento

| Documento | Estado | Descripción |
|-----------|--------|-------------|
| [📊 Análisis Técnico](01-analisis-tecnico.md) | 🔄 En progreso | Descomposición técnica y componentes afectados |
| [⏱️ Estimación](02-estimacion-sprint.md) | ⏳ Pendiente | Story points y desglose de tareas |
| [⚠️ Riesgos](03-riesgos-dependencias.md) | ⏳ Pendiente | Identificación de riesgos y dependencias |
| [✅ Criterios](04-criterios-aceptacion.md) | ⏳ Pendiente | Criterios de aceptación detallados |
| [❓ Preguntas](05-preguntas-refinamiento.md) | ⏳ Pendiente | Preguntas para el equipo |
| [🤖 Contexto IA](06-prompt-contexto.md) | ✅ Generado | Prompt para herramientas de IA |

## 🎯 Proceso de Refinamiento

### Fase 1: Análisis
- [ ] Completar análisis técnico
- [ ] Identificar componentes afectados
- [ ] Estimar complejidad

### Fase 2: Planificación
- [ ] Definir criterios de aceptación
- [ ] Estimar story points
- [ ] Identificar dependencias

### Fase 3: Validación
- [ ] Revisar con Product Owner
- [ ] Validar estimaciones con el equipo
- [ ] Aprobar para desarrollo

## 📞 Contacts

- **Product Owner**: TBD
- **Tech Lead**: TBD
- **Scrum Master**: TBD

---
*Generado automáticamente por refine-hu.sh - TEC.Sandbox*
EOF
}

generate_technical_analysis() {
    cat > "${HU_DIR}/01-analisis-tecnico.md" << EOF
# Análisis Técnico - $HU_NAME

**Fecha**: $TIMESTAMP  
**Analista**: TBD  

## 📋 Historia de Usuario

$HU_TEXT

## 🏗️ Análisis de Arquitectura

### Componentes Afectados

#### Frontend (Angular)
- [ ] **Componentes UI**: 
  - TBD (basado en ui-patterns.md)
  
- [ ] **Servicios**:
  - TBD (basado en architecture.md)
  
- [ ] **Rutas**:
  - TBD (revisar app.routes.ts)

#### Backend (Microservicios)
- [ ] **APIs afectadas**:
  - TBD (revisar integrations.md)
  
- [ ] **Modelos de datos**:
  - TBD (basado en domain.md)

### 🔄 Flujo de Datos

\`\`\`mermaid
graph TD
    A[Usuario] --> B[Frontend]
    B --> C[API Gateway]
    C --> D[Microservicio]
    D --> E[Base de Datos]
\`\`\`

*Nota: Actualizar diagrama según la funcionalidad específica*

### 🛠️ Cambios Técnicos Requeridos

#### Base de Datos
- [ ] **Nuevas tablas**: TBD
- [ ] **Modificaciones**: TBD
- [ ] **Índices**: TBD

#### APIs
- [ ] **Nuevos endpoints**: TBD
- [ ] **Modificaciones**: TBD
- [ ] **Versioning**: TBD

#### Frontend
- [ ] **Nuevos componentes**: TBD
- [ ] **Modificaciones**: TBD
- [ ] **Estados/Store**: TBD

### 🎨 Consideraciones de UI/UX

Basado en los patrones establecidos en ui-patterns.md:

- [ ] **Componentes del Design System**: TBD
- [ ] **Responsive Design**: Verificar breakpoints
- [ ] **Accessibility**: Cumplir estándares A11y
- [ ] **Loading States**: Implementar skeletons
- [ ] **Error Handling**: Mensajes de error consistentes

### 🔐 Seguridad y Permisos

Basado en USER-ROLES.md:

- [ ] **Roles afectados**: TBD
- [ ] **Permisos requeridos**: TBD
- [ ] **Guards necesarios**: TBD
- [ ] **Validaciones**: TBD

### 📝 Patrones de Código

Siguiendo conventions.md y standards.md:

- [ ] **Standalone Components**: ✅ Usar siempre
- [ ] **Signal-based State**: ✅ Para estado reactivo
- [ ] **Service Injection**: ✅ Usar inject()
- [ ] **Clean Architecture**: ✅ 4 capas en backend

### 🧪 Estrategia de Testing

- [ ] **Unit Tests**: Componentes y servicios
- [ ] **Integration Tests**: APIs y flujos
- [ ] **E2E Tests**: Casos de usuario críticos

## 📊 Complejidad Técnica

| Aspecto | Complejidad | Justificación |
|---------|-------------|---------------|
| Frontend | TBD | TBD |
| Backend | TBD | TBD |
| Base de Datos | TBD | TBD |
| Integración | TBD | TBD |

**Complejidad General**: TBD (Baja/Media/Alta)

## 🚧 Consideraciones de Implementación

### Fase 1: Backend
1. TBD

### Fase 2: Frontend  
1. TBD

### Fase 3: Testing e Integración
1. TBD

---
*Generado automáticamente por refine-hu.sh*
EOF
}

generate_estimation() {
    cat > "${HU_DIR}/02-estimacion-sprint.md" << EOF
# Estimación de Sprint - $HU_NAME

**Fecha**: $TIMESTAMP  
**Estimador**: TBD  

## 📋 Historia de Usuario

$HU_TEXT

## 🎯 Estimación General

| Métrica | Valor | Notas |
|---------|-------|-------|
| **Story Points** | TBD | Basado en complejidad técnica |
| **Tiempo Estimado** | TBD horas | Desarrollo + Testing |
| **Sprint Objetivo** | TBD | Sprint donde se planifica |

## 📝 Desglose de Tareas

### 🏗️ Backend Development

| Tarea | Estimación (h) | Complejidad | Responsable |
|-------|----------------|-------------|-------------|
| Análisis de requerimientos | 2h | Baja | TBD |
| Diseño de API | 4h | Media | TBD |
| Implementación modelo de datos | 6h | Media | TBD |
| Desarrollo endpoints | 8h | Alta | TBD |
| Validaciones y seguridad | 4h | Media | TBD |
| Testing unitario | 4h | Media | TBD |

**Subtotal Backend**: TBD horas

### 🎨 Frontend Development

| Tarea | Estimación (h) | Complejidad | Responsable |
|-------|----------------|-------------|-------------|
| Diseño de componentes | 3h | Media | TBD |
| Implementación UI | 8h | Alta | TBD |
| Integración con APIs | 4h | Media | TBD |
| Estados y navegación | 4h | Media | TBD |
| Responsive design | 3h | Baja | TBD |
| Testing componentes | 4h | Media | TBD |

**Subtotal Frontend**: TBD horas

### 🧪 Testing e Integración

| Tarea | Estimación (h) | Complejidad | Responsable |
|-------|----------------|-------------|-------------|
| Testing de integración | 4h | Media | TBD |
| E2E Testing | 6h | Alta | TBD |
| Performance testing | 2h | Baja | TBD |
| Documentación | 2h | Baja | TBD |

**Subtotal Testing**: TBD horas

## 📊 Resumen de Estimación

| Categoría | Horas | Porcentaje |
|-----------|-------|------------|
| Backend | TBD | TBD% |
| Frontend | TBD | TBD% |
| Testing | TBD | TBD% |
| **TOTAL** | **TBD** | **100%** |

## 🎯 Criterios de Estimación

### Factores de Complejidad
- [ ] **Nuevos patrones**: ¿Se requieren patrones no utilizados antes?
- [ ] **Integraciones**: ¿Hay integraciones complejas con sistemas externos?
- [ ] **Performance**: ¿Hay requerimientos especiales de rendimiento?
- [ ] **Seguridad**: ¿Hay consideraciones especiales de seguridad?

### Nivel de Confianza
- **Alta** (90%): Tareas similares realizadas antes
- **Media** (70%): Tareas con algunos elementos nuevos  
- **Baja** (50%): Tareas con muchos elementos desconocidos

**Nivel de Confianza General**: TBD

## 📅 Planificación de Sprint

### Sprint Actual: TBD

| Semana | Entregables | Responsable |
|--------|-------------|-------------|
| 1 | TBD | TBD |
| 2 | TBD | TBD |

### Definition of Done
- [ ] Código desarrollado siguiendo estándares del proyecto
- [ ] Tests unitarios con cobertura > 80%
- [ ] Tests de integración pasando
- [ ] Code review completado
- [ ] Documentación actualizada
- [ ] Deploy en ambiente de desarrollo
- [ ] Validación con Product Owner

## ⚠️ Supuestos y Restricciones

### Supuestos
- TBD

### Restricciones
- TBD

---
*Generado automáticamente por refine-hu.sh*
EOF
}

generate_risks_dependencies() {
    cat > "${HU_DIR}/03-riesgos-dependencias.md" << EOF
# Riesgos y Dependencias - $HU_NAME

**Fecha**: $TIMESTAMP  
**Analista de Riesgos**: TBD  

## 📋 Historia de Usuario

$HU_TEXT

## ⚠️ Análisis de Riesgos

### 🔴 Riesgos Altos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| TBD | Alta/Media/Baja | Alto/Medio/Bajo | TBD |

### 🟡 Riesgos Medios

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| TBD | Alta/Media/Baja | Alto/Medio/Bajo | TBD |

### 🟢 Riesgos Bajos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| TBD | Alta/Media/Baja | Alto/Medio/Bajo | TBD |

## 🔗 Dependencias

### 🏗️ Dependencias Técnicas

#### Sistemas Externos
- [ ] **Azure APIs**: ¿Se requiere integración con nuevas APIs de Azure?
- [ ] **Microsoft Teams**: ¿Afecta las notificaciones de Teams?
- [ ] **Base de Datos**: ¿Requiere cambios en esquema compartido?

#### Microservicios Internos
- [ ] **Catalogs API**: TBD
- [ ] **CloudManager API**: TBD  
- [ ] **InitiativesHub API**: TBD
- [ ] **PurchaseOrders API**: TBD
- [ ] **Users API**: TBD

### 👥 Dependencias de Equipo

| Equipo/Persona | Dependencia | Criticidad | Timeline |
|----------------|-------------|------------|----------|
| Product Owner | TBD | Alta/Media/Baja | TBD |
| UX/UI Team | TBD | Alta/Media/Baja | TBD |
| DevOps | TBD | Alta/Media/Baja | TBD |
| QA | TBD | Alta/Media/Baja | TBD |

### 📊 Dependencias de Datos

#### Modelos de Datos
- [ ] **User Model**: ¿Requiere cambios en estructura de usuario?
- [ ] **Initiative Model**: ¿Afecta el modelo de iniciativas?
- [ ] **Permissions Model**: ¿Requiere nuevos permisos?

#### Migraciones
- [ ] **Base de Datos**: ¿Se requieren migraciones?
- [ ] **Datos Existentes**: ¿Hay que migrar datos existentes?

## 🛡️ Plan de Mitigación

### Estrategia General
1. **Identificación Temprana**: Monitoreo continuo de riesgos
2. **Comunicación**: Alertas tempranas al equipo
3. **Contingencia**: Planes alternativos para riesgos críticos

### Acciones Específicas

#### Riesgo: TBD
- **Prevención**: TBD
- **Detección**: TBD  
- **Respuesta**: TBD
- **Recuperación**: TBD

## 📋 Checklist de Dependencias

### Pre-desarrollo
- [ ] Todas las dependencias identificadas
- [ ] Stakeholders notificados
- [ ] Timelines coordinados
- [ ] Recursos confirmados

### Durante desarrollo  
- [ ] Comunicación regular con dependencias
- [ ] Monitoreo de avance
- [ ] Identificación de nuevos riesgos

### Post-desarrollo
- [ ] Validación de integraciones
- [ ] Documentación de lessons learned
- [ ] Actualización de risk registry

## 📞 Contactos Clave

| Rol | Nombre | Email | Responsabilidad |
|-----|--------|-------|-----------------|
| Tech Lead | TBD | TBD | Decisiones técnicas |
| Product Owner | TBD | TBD | Requerimientos de negocio |
| DevOps Lead | TBD | TBD | Infraestructura y deploy |
| QA Lead | TBD | TBD | Estrategia de testing |

## 📈 Métricas de Seguimiento

- **Risk Burn Down**: Reducción de riesgos por sprint
- **Dependency Completion**: % de dependencias resueltas
- **Issue Escalation**: Tiempo de escalamiento de problemas

---
*Generado automáticamente por refine-hu.sh*
EOF
}

generate_acceptance_criteria() {
    cat > "${HU_DIR}/04-criterios-aceptacion.md" << EOF
# Criterios de Aceptación - $HU_NAME

**Fecha**: $TIMESTAMP  
**Product Owner**: TBD  

## 📋 Historia de Usuario

$HU_TEXT

## ✅ Criterios de Aceptación Generales

### Funcionalidad Principal

#### Dado que [contexto]
- **Cuando** [acción del usuario]
- **Entonces** [resultado esperado]

*Ejemplo:*
#### Dado que soy un usuario autenticado en el sistema
- **Cuando** navego a la sección de iniciativas  
- **Entonces** debo ver mi lista de iniciativas con sus estados actualizados

### Casos de Uso Específicos

#### 🎯 Caso de Uso 1: [Nombre del caso]
- **Precondiciones**: 
  - TBD
- **Pasos**:
  1. TBD
  2. TBD
- **Resultado Esperado**: TBD
- **Criterios de Éxito**: TBD

#### 🎯 Caso de Uso 2: [Nombre del caso]
- **Precondiciones**: 
  - TBD
- **Pasos**:
  1. TBD
  2. TBD
- **Resultado Esperado**: TBD
- **Criterios de Éxito**: TBD

## 🔍 Validaciones Técnicas

### Frontend
- [ ] **Responsive Design**: Funciona en todos los breakpoints definidos
- [ ] **Accessibility**: Cumple estándares WCAG 2.1 AA
- [ ] **Performance**: Tiempo de carga < 3 segundos
- [ ] **Browser Support**: Funciona en Chrome, Firefox, Safari, Edge
- [ ] **Error Handling**: Mensajes de error claros y útiles
- [ ] **Loading States**: Indicadores de carga apropiados

### Backend  
- [ ] **API Response**: Tiempo de respuesta < 500ms
- [ ] **Data Validation**: Validación adecuada de entrada
- [ ] **Error Handling**: Códigos de error HTTP apropiados
- [ ] **Security**: Validación de permisos y autenticación
- [ ] **Logging**: Logs apropiados para debugging y monitoring

### Base de Datos
- [ ] **Performance**: Queries optimizadas
- [ ] **Integrity**: Constraints y validaciones en DB
- [ ] **Backup**: Compatibilidad con estrategia de backup
- [ ] **Migration**: Scripts de migración funcionando

## 🧪 Casos de Prueba

### Funcionales

#### TC001: [Nombre del test case]
- **Objetivo**: TBD
- **Precondiciones**: TBD
- **Pasos de Ejecución**:
  1. TBD
  2. TBD
- **Resultado Esperado**: TBD
- **Prioridad**: Alta/Media/Baja

#### TC002: [Nombre del test case]
- **Objetivo**: TBD
- **Precondiciones**: TBD
- **Pasos de Ejecución**:
  1. TBD
  2. TBD
- **Resultado Esperado**: TBD
- **Prioridad**: Alta/Media/Baja

### No Funcionales

#### TC_NF001: Performance Test
- **Objetivo**: Validar tiempo de respuesta
- **Criterio**: < 3 segundos para carga inicial
- **Herramientas**: Lighthouse, WebPageTest

#### TC_NF002: Security Test  
- **Objetivo**: Validar autenticación y autorización
- **Criterio**: Solo usuarios autorizados pueden acceder
- **Herramientas**: Manual testing, OWASP ZAP

#### TC_NF003: Usability Test
- **Objetivo**: Validar facilidad de uso
- **Criterio**: Usuario puede completar flujo sin ayuda
- **Herramientas**: User testing sessions

## 🚫 Casos Negativos

### Manejo de Errores
- [ ] **Datos Inválidos**: Sistema maneja graciosamente datos incorrectos
- [ ] **Permisos Insuficientes**: Mensaje claro cuando no hay permisos
- [ ] **Conexión Perdida**: Manejo de errores de red
- [ ] **Timeout**: Manejo de timeouts en APIs

### Edge Cases
- [ ] **Campos Vacíos**: Validación de campos requeridos
- [ ] **Datos Extremos**: Manejo de valores límite
- [ ] **Concurrencia**: Múltiples usuarios editando simultaneamente

## ✅ Definition of Done

### Desarrollo
- [ ] Código implementado siguiendo estándares del proyecto (standards.md)
- [ ] Patrones de arquitectura respetados (architecture.md)
- [ ] Convenciones de código aplicadas (conventions.md)
- [ ] Unit tests escritos con cobertura > 80%
- [ ] Integration tests pasando
- [ ] Code review completado y aprobado

### Testing
- [ ] Todos los casos de prueba ejecutados exitosamente
- [ ] Performance tests pasando
- [ ] Security testing completado
- [ ] Cross-browser testing realizado
- [ ] Accessibility testing completado

### Documentación
- [ ] Documentación técnica actualizada
- [ ] README actualizado si aplica
- [ ] Comentarios en código para lógica compleja
- [ ] API documentation actualizada

### Deployment
- [ ] Deploy en ambiente de desarrollo exitoso
- [ ] Deploy en ambiente de staging exitoso  
- [ ] Smoke tests en staging pasando
- [ ] Rollback plan documentado

### Aceptación
- [ ] Product Owner ha validado la funcionalidad
- [ ] Demo completado con stakeholders
- [ ] Feedback incorporado
- [ ] Sign-off del Product Owner obtenido

## 📋 Checklist de Validación

### Pre-entrega
- [ ] Todos los criterios de aceptación cumplidos
- [ ] Testing completo ejecutado
- [ ] Performance dentro de parámetros
- [ ] Security validado
- [ ] Documentación completa

### Entrega
- [ ] Demo preparado
- [ ] Datos de prueba listos
- [ ] Stakeholders notificados
- [ ] Feedback session agendada

---
*Generado automáticamente por refine-hu.sh*
EOF
}

generate_refinement_questions() {
    cat > "${HU_DIR}/05-preguntas-refinamiento.md" << EOF
# Preguntas de Refinamiento - $HU_NAME

**Fecha**: $TIMESTAMP  
**Scrum Master**: TBD  

## 📋 Historia de Usuario

$HU_TEXT

## ❓ Preguntas para Product Owner

### 🎯 Clarificación de Requerimientos

1. **Alcance y Prioridad**
   - ¿Cuál es la prioridad de esta HU en el backlog?
   - ¿Hay alguna fecha límite específica?
   - ¿Qué sucede si no se implementa en el sprint planeado?

2. **Casos de Uso**
   - ¿Cuáles son los escenarios principales de uso?
   - ¿Hay casos edge que debemos considerar?
   - ¿Existen restricciones de negocio específicas?

3. **Usuarios Objetivo**
   - ¿Qué tipos de usuario usarán esta funcionalidad?
   - ¿Hay diferencias en el comportamiento por rol de usuario?
   - ¿Todos los usuarios tendrán acceso o hay restricciones?

4. **Criterios de Éxito**
   - ¿Cómo mediremos el éxito de esta funcionalidad?
   - ¿Hay métricas específicas que monitorear?
   - ¿Cuál es el criterio mínimo viable?

### 🔄 Integración con Sistema Existente

5. **Impacto en Funcionalidades Existentes**
   - ¿Esta HU afecta funcionalidades ya implementadas?
   - ¿Hay que modificar flujos de usuario existentes?
   - ¿Se requiere migración de datos existentes?

6. **Consistencia de UX**
   - ¿Debe seguir patrones específicos de la aplicación?
   - ¿Hay referencias de diseño o wireframes?
   - ¿Existe un flujo de usuario definido?

## 🛠️ Preguntas Técnicas para el Equipo

### 🏗️ Arquitectura y Diseño

7. **Componentes Afectados**
   - ¿Qué microservicios necesitan modificación?
   - ¿Se requieren nuevos componentes de UI?
   - ¿Hay que modificar el modelo de datos?

8. **Integraciones**
   - ¿Se requieren integraciones con APIs externas?
   - ¿Hay dependencias con otros equipos?
   - ¿Se necesitan nuevos permisos o roles?

9. **Performance y Escalabilidad**
   - ¿Hay expectativas específicas de performance?
   - ¿Cuántos usuarios concurrentes se esperan?
   - ¿Hay restricciones de recursos?

### 🧪 Testing y Calidad

10. **Estrategia de Testing**
    - ¿Qué tipos de testing son críticos para esta HU?
    - ¿Hay datos específicos de prueba requeridos?
    - ¿Se necesita testing de performance específico?

11. **Criterios de Calidad**
    - ¿Hay estándares específicos de accesibilidad?
    - ¿Qué browsers/dispositivos soportar?
    - ¿Hay requerimientos de SEO?

## 🔐 Preguntas de Seguridad

12. **Autenticación y Autorización**
    - ¿Qué roles pueden acceder a esta funcionalidad?
    - ¿Hay datos sensibles involucrados?
    - ¿Se requiere auditoría de acciones?

13. **Cumplimiento**
    - ¿Hay regulaciones específicas que cumplir?
    - ¿Se manejan datos personales (GDPR)?
    - ¿Hay requerimientos de compliance específicos?

## 📊 Preguntas de UX/UI

### 🎨 Diseño e Interacción

14. **Experiencia de Usuario**
    - ¿Hay mockups o prototipos disponibles?
    - ¿Cuál es el flujo de usuario ideal?
    - ¿Hay states específicos a considerar (loading, error, success)?

15. **Responsive y Accesibilidad**
    - ¿Qué dispositivos son prioritarios?
    - ¿Hay requerimientos específicos de accesibilidad?
    - ¿Debe funcionar offline o en conexiones lentas?

## 🚀 Preguntas de Implementación

### 📅 Cronograma y Recursos

16. **Timeline**
    - ¿Hay hitos específicos dentro del desarrollo?
    - ¿Se puede implementar en fases?
    - ¿Qué es lo mínimo viable para entregar valor?

17. **Recursos y Dependencias**
    - ¿Qué recursos adicionales se necesitan?
    - ¿Hay dependencias externas críticas?
    - ¿Se requiere capacitación o documentación especial?

## 🎯 Preguntas de Validación

### ✅ Criterios de Aceptación

18. **Validación de Entrega**
    - ¿Cómo validaremos que la HU está completa?
    - ¿Quién debe aprobar la funcionalidad?
    - ¿Hay un proceso específico de UAT (User Acceptance Testing)?

19. **Post-implementación**
    - ¿Qué métricas monitorear después del deploy?
    - ¿Hay plan de rollback si algo falla?
    - ¿Se requiere documentación de usuario?

## 📝 Dudas y Clarificaciones Adicionales

### Identificadas durante el análisis:

- [ ] **Duda 1**: TBD
- [ ] **Duda 2**: TBD
- [ ] **Duda 3**: TBD

### Para investigar:

- [ ] **Investigación 1**: TBD
- [ ] **Investigación 2**: TBD
- [ ] **Investigación 3**: TBD

## 📞 Próximos Pasos

### Sesión de Refinamiento
- **Fecha propuesta**: TBD
- **Participantes requeridos**: 
  - Product Owner
  - Tech Lead
  - UX Designer (si aplica)
  - Scrum Master
  - Equipo de desarrollo

### Agenda Sugerida
1. Revisión de la HU (5 min)
2. Clarificación de preguntas (20 min)
3. Análisis técnico (15 min)
4. Estimación (10 min)
5. Definition of Done (5 min)
6. Próximos pasos (5 min)

---
*Generado automáticamente por refine-hu.sh*
EOF
}

generate_ai_context() {
    local context=$(read_claude_context)
    
    cat > "${HU_DIR}/06-prompt-contexto.md" << EOF
# Contexto para IA - $HU_NAME

**Fecha**: $TIMESTAMP  
**Propósito**: Contexto optimizado para herramientas de IA (Claude, Cursor, etc.)

## 📋 Historia de Usuario

$HU_TEXT

## 🤖 Prompt para Claude Code

\`\`\`
Actúa como un Senior Full Stack Developer especializado en el proyecto TEC.Sandbox.

CONTEXTO DEL PROYECTO:
- **Plataforma**: Gestión de iniciativas de investigación del Tecnológico de Monterrey
- **Stack**: Angular 19 + .NET 8 + MySQL + Dapr + Azure
- **Arquitectura**: Microservicios con Clean Architecture
- **Frontend**: Standalone components, Signals, TEC Design System
- **Backend**: 4-layer architecture (API, Application, Domain, Infrastructure)

HISTORIA DE USUARIO A IMPLEMENTAR:
$HU_TEXT

INSTRUCCIONES:
1. Analiza la HU basándote en la arquitectura existente del proyecto
2. Propón una implementación que siga los patrones establecidos
3. Considera las convenciones de código del proyecto
4. Incluye manejo de errores y casos edge
5. Sugiere tests apropiados
6. Documenta las decisiones arquitectónicas

CONTEXTO TÉCNICO COMPLETO:
$context

ENTREGABLES ESPERADOS:
- Análisis de componentes afectados
- Código de implementación siguiendo patrones
- Tests unitarios e integración
- Documentación técnica
- Plan de deployment

Genera una implementación completa y robusta que se integre perfectamente con el ecosistema TEC.Sandbox existente.
\`\`\`

## 🎯 Contexto Específico para la HU

### Componentes Probablemente Afectados
Basado en el análisis de la HU y la arquitectura del proyecto:

#### Frontend (Angular)
- **Páginas**: TBD (revisar src/app/pages/)
- **Componentes**: TBD (revisar src/app/components/)
- **Servicios**: TBD (revisar src/app/services/)
- **Interfaces**: TBD (revisar src/app/interfaces/)
- **Guards**: TBD (revisar src/app/guards/)

#### Backend (Microservicios)
- **APIs afectadas**: TBD
  - Catalogs API: ¿Se requieren nuevos catálogos?
  - CloudManager API: ¿Afecta gestión de infraestructura?
  - InitiativesHub API: ¿Modifica iniciativas?
  - PurchaseOrders API: ¿Involucra órdenes de compra?
  - Users API: ¿Requiere cambios en usuarios?

### Patrones a Seguir

#### Angular (Frontend)
\`\`\`typescript
// Standalone Component Pattern
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, BmbButtonComponent],
  template: \`...\`
})
export class ExampleComponent {
  private service = inject(ExampleService);
  private userStore = inject(UserStore);
  
  // Use signals for reactive state
  data = signal<DataInterface[]>([]);
}
\`\`\`

#### Clean Architecture (Backend)
\`\`\`csharp
// API Layer
[ApiController]
[Route("api/v{version:apiVersion}/[controller]")]
public class ExampleController : ApiController
{
    private readonly IExampleInteractor _interactor;
    private readonly IExamplePresenter _presenter;

    public ExampleController(IExampleInteractor interactor, IExamplePresenter presenter)
    {
        _interactor = interactor;
        _presenter = presenter;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        await _interactor.GetAllAsync();
        return _presenter.ContentResult;
    }
}
\`\`\`

### Convenciones del Proyecto

#### Naming Conventions
- **Files**: kebab-case para archivos
- **Classes**: PascalCase para clases
- **Variables**: camelCase para variables
- **Constants**: UPPER_SNAKE_CASE

#### Code Standards
- **Angular**: Standalone components obligatorio
- **TypeScript**: Strict mode, no any types
- **CSS**: TailwindCSS + SCSS, responsive first
- **API**: RESTful conventions, proper HTTP codes
- **Testing**: > 80% coverage, AAA pattern

### Integración con Sistema Existente

#### State Management
\`\`\`typescript
// User Store Pattern
@Injectable({ providedIn: 'root' })
export class ExampleStore {
  private _data = signal<ExampleInterface[]>([]);
  
  readonly data$ = this._data.asReadonly();
  
  setData(data: ExampleInterface[]): void {
    this._data.set(data);
  }
}
\`\`\`

#### API Integration
\`\`\`typescript
// Service Pattern
@Injectable({ providedIn: 'root' })
export class ExampleService {
  private http = inject(HttpClient);
  private baseUrl = '/api/v1/example';

  getAll(): Observable<ExampleDto[]> {
    return this.http.get<ExampleDto[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError = (error: HttpErrorResponse) => {
    // Handle based on project error handling patterns
    return throwError(() => new Error(error.message));
  };
}
\`\`\`

## 🔍 Checklist de Implementación

### Pre-desarrollo
- [ ] Revisar componentes existentes similares
- [ ] Validar que la solución sigue patrones establecidos
- [ ] Confirmar que no rompe funcionalidad existente
- [ ] Verificar permisos y roles necesarios

### Durante desarrollo
- [ ] Seguir convenciones de naming
- [ ] Usar componentes del TEC Design System
- [ ] Implementar manejo de errores consistente
- [ ] Agregar loading states apropiados
- [ ] Considerar responsive design

### Post-desarrollo
- [ ] Tests unitarios e integración
- [ ] Validar performance y accessibility
- [ ] Documentar cambios en arquitectura
- [ ] Actualizar documentación de APIs

## 📚 Referencias del Proyecto

- **Architecture**: Revisar docs/ARCHITECTURE.md
- **User Roles**: Revisar docs/USER-ROLES.md  
- **Dashboard Admin**: Revisar docs/DASHBOARD-ADMIN.md
- **Code Standards**: Revisar .claude/standards.md
- **UI Patterns**: Revisar .claude/ui-patterns.md

---
*Generado automáticamente por refine-hu.sh*
*Contexto actualizado: $TIMESTAMP*
EOF
}

# =============================================================================
# FUNCIÓN PRINCIPAL
# =============================================================================

main() {
    print_header
    
    # Validar entorno
    validate_environment
    
    # Obtener input del usuario
    get_user_input
    
    # Crear directorio para la HU
    log_info "Creando estructura de documentación para: $HU_NAME"
    mkdir -p "$HU_DIR"
    
    # Generar todos los archivos
    log_info "Generando documentos de refinamiento..."
    
    generate_readme
    log_success "✓ README.md creado"
    
    generate_technical_analysis
    log_success "✓ 01-analisis-tecnico.md creado"
    
    generate_estimation
    log_success "✓ 02-estimacion-sprint.md creado"
    
    generate_risks_dependencies
    log_success "✓ 03-riesgos-dependencias.md creado"
    
    generate_acceptance_criteria
    log_success "✓ 04-criterios-aceptacion.md creado"
    
    generate_refinement_questions
    log_success "✓ 05-preguntas-refinamiento.md creado"
    
    generate_ai_context
    log_success "✓ 06-prompt-contexto.md creado"
    
    echo
    log_success "🎉 Documentación de refinamiento generada exitosamente!"
    echo
    log_info "📁 Ubicación: $HU_DIR"
    log_info "📝 Archivos creados: 7"
    echo
    log_info "📋 Próximos pasos:"
    echo "   1. Revisar y completar el análisis técnico"
    echo "   2. Actualizar estimaciones con el equipo"  
    echo "   3. Programar sesión de refinamiento"
    echo "   4. Usar 06-prompt-contexto.md con Claude Code"
    echo
    log_info "🚀 Para abrir la documentación:"
    echo "   code $HU_DIR"
    echo
}

# =============================================================================
# EJECUCIÓN
# =============================================================================

# Verificar que se ejecuta desde el directorio correcto
if [[ ! -f "package.json" ]] || [[ ! -d ".claude" ]]; then
    log_error "Este script debe ejecutarse desde la raíz del proyecto TEC.Sandbox (donde está package.json y .claude/)"
fi

# Ejecutar función principal
main "$@"
EOF