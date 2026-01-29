// Type declarations to fix react-native-svg compatibility with React 19
declare module 'react-native-svg' {
    import { ComponentType, ReactNode } from 'react';
    import { ViewStyle } from 'react-native';

    interface CommonProps {
        children?: ReactNode;
        style?: ViewStyle;
    }

    interface SvgProps extends CommonProps {
        width?: number | string;
        height?: number | string;
        viewBox?: string;
        fill?: string;
    }

    interface PathProps extends CommonProps {
        d?: string;
        fill?: string;
        stroke?: string;
        strokeWidth?: number | string;
        strokeLinecap?: 'butt' | 'round' | 'square';
        strokeLinejoin?: 'miter' | 'round' | 'bevel';
        fillRule?: 'nonzero' | 'evenodd';
        clipRule?: 'nonzero' | 'evenodd';
        fillOpacity?: number | string;
    }

    interface CircleProps extends CommonProps {
        cx?: number | string;
        cy?: number | string;
        r?: number | string;
        fill?: string;
        stroke?: string;
        strokeWidth?: number | string;
        strokeDasharray?: string;
        strokeLinecap?: 'butt' | 'round' | 'square';
        strokeLinejoin?: 'miter' | 'round' | 'bevel';
        transform?: string;
    }

    interface RectProps extends CommonProps {
        x?: number | string;
        y?: number | string;
        width?: number | string;
        height?: number | string;
        rx?: number | string;
        ry?: number | string;
        fill?: string;
        stroke?: string;
        strokeWidth?: number | string;
        fillOpacity?: number | string;
    }

    interface GProps extends CommonProps {
        transform?: string;
    }

    interface DefsProps extends CommonProps { }

    interface LinearGradientProps extends CommonProps {
        id?: string;
        x1?: number | string;
        y1?: number | string;
        x2?: number | string;
        y2?: number | string;
        gradientUnits?: 'userSpaceOnUse' | 'objectBoundingBox';
    }

    interface RadialGradientProps extends CommonProps {
        id?: string;
        cx?: number | string;
        cy?: number | string;
        rx?: number | string;
        ry?: number | string;
        fx?: number | string;
        fy?: number | string;
        gradientUnits?: 'userSpaceOnUse' | 'objectBoundingBox';
    }

    interface StopProps extends CommonProps {
        offset?: number | string;
        stopColor?: string;
        stopOpacity?: number | string;
    }

    interface MaskProps extends CommonProps {
        id?: string;
        x?: number | string;
        y?: number | string;
        width?: number | string;
        height?: number | string;
    }

    interface ClipPathProps extends CommonProps {
        id?: string;
    }

    const Svg: ComponentType<SvgProps>;
    const Path: ComponentType<PathProps>;
    const Circle: ComponentType<CircleProps>;
    const Rect: ComponentType<RectProps>;
    const G: ComponentType<GProps>;
    const Defs: ComponentType<DefsProps>;
    const LinearGradient: ComponentType<LinearGradientProps>;
    const RadialGradient: ComponentType<RadialGradientProps>;
    const Stop: ComponentType<StopProps>;
    const Mask: ComponentType<MaskProps>;
    const ClipPath: ComponentType<ClipPathProps>;

    export default Svg;
    export {
        Svg,
        Path,
        Circle,
        Rect,
        G,
        Defs,
        LinearGradient,
        RadialGradient,
        Stop,
        Mask,
        ClipPath,
    };
}
