import{f,r,o as c,c as _,d as t,w as n,g as a,i as h,h as g,j as w,k as i}from"./index-a44cf2ec.js";const y={class:"q-pa-md"},q={__name:"steps",setup(k){let e=f(1);return(d,o)=>{const l=r("q-step"),p=r("q-btn"),u=r("q-stepper-navigation"),m=r("q-stepper");return c(),_("div",y,[t(m,{modelValue:a(e),"onUpdate:modelValue":o[2]||(o[2]=s=>h(e)?e.value=s:e=s),ref:"stepper",contracted:"",color:"primary",animated:""},{navigation:n(()=>[t(u,null,{default:n(()=>[t(p,{onClick:o[0]||(o[0]=s=>d.$refs.stepper.next()),color:"primary",label:a(e)===3?"Finish":"Continue"},null,8,["label"]),a(e)>1?(c(),g(p,{key:0,flat:"",color:"primary",onClick:o[1]||(o[1]=s=>d.$refs.stepper.previous()),label:"Back",class:"q-ml-sm"})):w("",!0)]),_:1})]),default:n(()=>[t(l,{name:1,title:"Select campaign settings",icon:"settings",done:a(e)>1},{default:n(()=>[i(" For each ad campaign that you create, you can control how much you're willing to spend on clicks and conversions, which networks and geographical locations you want your ads to show on, and more. ")]),_:1},8,["done"]),t(l,{name:2,title:"Create an ad group",caption:"Optional",icon:"create_new_folder",done:a(e)>2},{default:n(()=>[i(" An ad group contains one or more ads which target a shared set of keywords. ")]),_:1},8,["done"]),t(l,{name:3,title:"Create an ad",icon:"add_comment"},{default:n(()=>[i(" Try out different ad text to see what brings in the most customers, and learn how to enhance your ads using features like ad extensions. If you run into any problems with your ads, find out how to tell if they're running and how to resolve approval issues. ")]),_:1})]),_:1},8,["modelValue"])])}}};export{q as default};
