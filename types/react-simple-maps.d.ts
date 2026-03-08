declare module 'react-simple-maps' {
  import { ComponentType, CSSProperties, ReactNode } from 'react'

  export interface ProjectionConfig {
    center?: [number, number]
    scale?: number
    rotate?: [number, number, number]
    parallels?: [number, number]
  }

  export interface ComposableMapProps {
    width?: number
    height?: number
    projection?: string
    projectionConfig?: ProjectionConfig
    className?: string
    style?: CSSProperties
    children?: ReactNode
  }

  export interface GeographiesProps {
    geography: string | object
    children: (data: { geographies: Geography[] }) => ReactNode
  }

  export interface Geography {
    rsmKey: string
    properties: Record<string, unknown>
    geometry: object
    type: string
  }

  export interface GeographyProps {
    geography: Geography
    fill?: string
    stroke?: string
    strokeWidth?: number
    className?: string
    style?: {
      default?: CSSProperties & { outline?: string }
      hover?: CSSProperties & { outline?: string }
      pressed?: CSSProperties & { outline?: string }
    }
    onMouseEnter?: (event: React.MouseEvent) => void
    onMouseLeave?: (event: React.MouseEvent) => void
    onClick?: (event: React.MouseEvent) => void
  }

  export interface MarkerProps {
    coordinates: [number, number]
    children?: ReactNode
    style?: CSSProperties
  }

  export interface LineProps {
    from: [number, number]
    to: [number, number]
    stroke?: string
    strokeWidth?: number
    strokeLinecap?: 'round' | 'butt' | 'square'
    strokeDasharray?: string
    style?: CSSProperties
  }

  export interface AnnotationProps {
    subject: [number, number]
    dx?: number
    dy?: number
    curve?: number
    connectorProps?: object
    children?: ReactNode
  }

  export interface GraticuleProps {
    stroke?: string
    strokeWidth?: number
    step?: [number, number]
  }

  export interface SphereProps {
    id?: string
    fill?: string
    stroke?: string
    strokeWidth?: number
  }

  export interface ZoomableGroupProps {
    center?: [number, number]
    zoom?: number
    minZoom?: number
    maxZoom?: number
    translateExtent?: [[number, number], [number, number]]
    onMoveStart?: (event: any, position: { x: number; y: number; k: number }) => void
    onMove?: (event: any, position: { x: number; y: number; k: number }) => void
    onMoveEnd?: (event: any, position: { x: number; y: number; k: number }) => void
    children?: ReactNode
  }

  export const ComposableMap: ComponentType<ComposableMapProps>
  export const Geographies: ComponentType<GeographiesProps>
  export const Geography: ComponentType<GeographyProps>
  export const Marker: ComponentType<MarkerProps>
  export const Line: ComponentType<LineProps>
  export const Annotation: ComponentType<AnnotationProps>
  export const Graticule: ComponentType<GraticuleProps>
  export const Sphere: ComponentType<SphereProps>
  export const ZoomableGroup: ComponentType<ZoomableGroupProps>
}
