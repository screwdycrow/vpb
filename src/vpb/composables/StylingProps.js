import Prop from "@/vpb/models/Prop";

//composable with stylingPropDefinitions and parameteres for default values
const useStylingPropsDefinition = (backgroundColor, padding, margin, borderRadius, borderWidth, borderColor) => {
    return[
        new Prop({
            tab:'Styling',
            group:'Spacing',
            name:'padding',
            label:'Padding',
            type: 'cssFourSides',
            defaultValue: padding || ['0','0','0','0']
        }),
        new Prop({
            tab:'Styling',
            group:'Spacing',
            name:'margin',
            label:'Margin',
            type: 'cssFourSides',
            defaultValue:  margin || ['0','0','0','0']
        }),
        new Prop({
            tab:'Styling',
            group:'Spacing',
            name:'borderWidth',
            label:'Border Width',
            type: 'cssFourSides',
            defaultValue: borderWidth || ['0','0','0','0']
        }),
        new Prop({
            tab:'Styling',
            group:'Spacing',
            name:'borderRadius',
            label:'Border Radius',
            type: 'cssFourSides',
            defaultValue: borderRadius || ['0','0','0','0']
        }),
        new Prop({
            tab:'Styling',
            group:'Spacing',
            type: 'color',
            name: 'borderColor',
            label: 'Border Color',
            defaultValue: borderColor || ''
        }),
        new Prop({
            tab:'Styling',
            group:'Spacing',
            type: 'color',
            name: 'backgroundColor',
            label: 'Background',
            defaultValue: backgroundColor || 'transparent'
        }),

    ]
}

//composable with stylingProps and parameteres for default values
const useStylingProps = (backgroundColor, padding, margin, borderRadius, borderWidth, borderColor) => {
    return{
        padding: {type: Array, default: padding || ['0','0','0','0']},
        margin: {type: Array, default: margin || ['0','0','0','0']},
        borderWidth: {type: Array, default: borderWidth || ['0','0','0','0']},
        borderRadius: {type: Array, default: borderRadius || ['0','0','0','0']},
        borderColor: {type: String, default: borderColor || 'transparent'},
        backgroundColor: {type: String, default: backgroundColor || 'transparent'},
    }
}
export  { useStylingProps, useStylingPropsDefinition}