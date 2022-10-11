import Prop from "@/vpb/models/Prop";

const usePropTextDefinition = (fontSize, fontWeight, fontColor) => {
    return [
        new Prop({
            tab: 'Styling',
            group: 'Font',
            name: 'fontSize',
            label: 'Font Size',
            type: 'text',
            defaultValue: fontSize || '16px'
        }),
        new Prop({
            tab: 'Styling',
            group: 'Font',
            name: 'fontWeight',
            label: 'Font Weight',
            type: 'text',
            defaultValue: fontWeight || 'normal'
        }),
        new Prop({
            tab: 'Styling',
            group: 'Font',
            type: 'color',
            name: 'fontColor',
            label: 'Font Color',
            defaultValue: fontColor || '#222'
        }),
    ]
}

const useTextProps = (fontSize, fontWeight, fontColor) => {
    return {
        fontSize: {type: String, default: fontSize || '16px'},
        fontWeight: {type: String, default: fontWeight || 'normal'},
        fontColor: {type: String, default: fontColor || '#222'},
    }
}
export {useTextProps, usePropTextDefinition}