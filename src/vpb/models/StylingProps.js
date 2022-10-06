import Prop from "@/vpb/models/Prop";

const stylingPropDefinitions = [
    new Prop({
        tab:'Styling',
        group:'Spacing',
        name:'padding',
        label:'Padding',
        type: 'cssFourSides',
        defaultValue: ['0','0','0','0']
    }),
    new Prop({
        tab:'Styling',
        group:'Spacing',
        name:'margin',
        label:'Margin',
        type: 'cssFourSides',
        defaultValue: ['0','0','0','0']
    }),
    new Prop({
        tab:'Styling',
        group:'Spacing',
        name:'borderWidth',
        label:'Border Width',
        type: 'cssFourSides',
        defaultValue: ['0','0','0','0']
    }),
    new Prop({
        tab:'Styling',
        group:'Spacing',
        name:'borderRadius',
        label:'Border Radius',
        type: 'cssFourSides',
        defaultValue: ['0','0','0','0']
    }),
    new Prop({
        tab:'Styling',
        group:'Spacing',
        type: 'color',
        name: 'backgroundColor',
        label: 'Background',
        defaultValue: 'transparent'
    }),
    new Prop({
        tab:'Styling',
        group:'Spacing',
        type: 'color',
        name: 'textColor',
        label: 'Text Color',
        defaultValue: '#222'
    }),
    new Prop({
        tab:'Styling',
        group:'Spacing',
        type: 'color',
        name: 'borderColor',
        label: 'Border Color',
        defaultValue: '#222'
    }),


]
const stylingProps = {
    padding:{type:Array, default:()=>['0','0','0','0']},
    margin:{type:Array, default:()=>['0','0','0','0']},
    textColor:String,
    backgroundColor:String,
    borderWidth:{type:Array, default:()=>['0','0','0','0']},
    borderColor:String,
    borderRadius:{type:Array, default:()=>['0','0','0','0']}
}
export  { stylingProps, stylingPropDefinitions}