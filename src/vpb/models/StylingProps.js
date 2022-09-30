import Prop from "@/vpb/models/Prop";

const stylingPropDefinitions = [
    new Prop({
        group:'Styling',
        name:'padding',
        label:'Padding',
        type: 'cssFourSides',
        defaultValue: ['0','0','0','0']
    }),
    new Prop({
        group:'Styling',
        name:'margin',
        label:'Margin',
        type: 'cssFourSides',
        defaultValue: ['0','0','0','0']
    }),
    new Prop({
        group:'Styling',
        name:'borderWidth',
        label:'Border Width',
        type: 'cssFourSides',
        defaultValue: ['0','0','0','0']
    }),
    new Prop({
        group:'Styling',
        name:'borderRadius',
        label:'Border Radius',
        type: 'cssFourSides',
        defaultValue: ['0','0','0','0']
    }),
    new Prop({
        group:'Styling',
        type: 'color',
        name: 'backgroundColor',
        label: 'Background',
        defaultValue: 'transparent'
    }),
    new Prop({
        group:'Styling',
        type: 'color',
        name: 'textColor',
        label: 'Text Color',
        defaultValue: '#222'
    }),
    new Prop({
        group:'Styling',
        type: 'color',
        name: 'borderColor',
        label: 'Border Color',
        defaultValue: '#222'
    }),


]
const stylingProps = {
    padding:{type:Array, default:()=>['0','0','0','0']},
    margin:{type:String, default:()=>['0','0','0','0']},
    color:String,
    backgroundColor:String,
    borderWidth:{type:String, default:()=>['0','0','0','0']},
    borderColor:String,
    borderRadius:{type:String, default:()=>['0','0','0','0']}
}
export  { stylingProps, stylingPropDefinitions}