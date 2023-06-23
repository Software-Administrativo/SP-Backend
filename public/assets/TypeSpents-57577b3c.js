import{q as T,s as I,_ as ve,v as fe,x as _e,f as r,y as me,l as Q,z as ge,A as ye,r as d,o as V,c as H,a as c,d as e,w as s,g as p,h as N,M as be,j as J,F as he,i as k,k as A,t as qe,B as K,C as X,p as we,e as Se}from"./index-a44cf2ec.js";import{B as ke}from"./ButtonAdd-afa95f18.js";const Te=async l=>{T();try{const i=T(),{data:t}=await I.get("/maintenance/spents",{headers:{token:i,farm:l}});return t}catch(i){return i}},xe=async(l,i)=>{try{const t=T(),{data:v}=await I.post("/maintenance/spents/register",{name:l.name,description:l.description},{headers:{token:t,farm:i}});return v}catch(t){return t}},Ve=async(l,i)=>{try{const t=T(),{data:v}=await I.put(`/maintenance/spents/update/${l.id}`,{name:l.name,description:l.description},{headers:{token:t,farm:i}});return v}catch(t){return t}},Ae=async(l,i)=>{try{const t=T(),{data:v}=await I.put(`/maintenance/spents/inactive/${l}`,{},{headers:{token:t,farm:i}});return v}catch(t){return t}},Ie=async(l,i)=>{try{const t=T(),{data:v}=await I.put(`/maintenance/spents/active/${l}`,{},{headers:{token:t,farm:i}});return v}catch(t){return t}};const B=l=>(we("data-v-c8a7ecfc"),l=l(),Se(),l),Oe={class:"q-py-md table-container"},Ce={class:"row"},Ee=B(()=>c("h6",{class:"title q-my-lg"},"TIPOS DE GASTO",-1)),De={class:"container-content"},ze={class:"container-table q-mt-md q-pa-md",rounded:""},Me={class:"accions-td"},Ne={class:"accions-td"},Be=B(()=>c("i",{class:"icon icon-check"},null,-1)),Re={class:"modal-spents"},Ge={class:"q-my-md text-center"},Ue={class:"row q-px-xl"},Fe={class:"col-12"},Pe=B(()=>c("span",{class:"text-required q-pb-sm"},[A("Todos los campos con "),c("span",{class:"text-red"},"*"),A(" son obligatorios")],-1)),$e={class:"row justify-center"},je={key:0,class:"spinner"},We={__name:"TypeSpents",setup(l){const i=fe(),t=_e(),v=r(""),f=r(!1),C=r(!0),q=r([]),x=r([]),R=r(),Y=me(),b=r(!1),G=Q(()=>_.value==""?!0:b.value==!0),Z=[a=>!!a||"Este campo es requerido"];let m=r(""),h=r("active"),_=r(""),g=r(""),E=r(""),D=r("");const U=r([{name:"id",label:"#",field:"id",align:"left",sortable:!0,headerStyle:"font-size: var(--font-large); font-weight: bold;",style:"font-size: var(--font-large);"},{name:"name",label:"Nombre",field:"name",align:"left",sortable:!0,headerStyle:"font-size: var(--font-large); font-weight: bold;",style:"font-size: var(--font-large);"},{name:"description",label:"Descripción",field:"description",align:"left",sortable:!0,headerStyle:"font-size: var(--font-large); font-weight: bold;",style:"font-size: var(--font-large);"},{name:"Acciones",label:"Acciones",field:"acciones",align:"center",sortable:!0,headerStyle:"font-size: var(--font-medium); font-weight: bold;",style:"font-size: var(--font-medium);"}]),ee=a=>{_.value=a},te=a=>{g.value=a},ae=()=>{v.value="REGISTRAR TIPO DE GASTO",oe(),C.value=!0,t.toggleModal()},oe=()=>{D.value="",E.value="",_.value="",g.value=""},ne=a=>{v.value="EDITAR TIPO DE GASTO",C.value=!1,R.value=a._id,D.value=a.description,E.value=a.name,_.value=a.name,g.value=a.description,t.toggleModal()},y=(a,n)=>{i.notify({type:a,message:n,position:"top"})},w=async()=>{q.value=[],x.value=[],f.value=!0;try{const{spents:a}=await Te(S.value);let n=1,O=1;a.forEach(u=>{u.status=u.status?"Inactivo":"Activo",u.status=="Activo"?(u.id=n++,q.value.push(u)):(u.id=O++,x.value.push(u)),u.description=u.description.trim()==""?"No registra":u.description}),f.value=!1}catch{f.value=!1,y("negative","Ocurrió un error")}};async function se(){b.value=!0;try{const a=await xe({name:_.value,description:g.value},S.value);b.value=!1,y("positive","Tipo de gasto registrado correctamente"),t.toggleModal(),q.value=[],w()}catch{b.value=!1,y("negative","Ocurrió un error, por favor verifique los datos")}}async function le(){b.value=!0;try{const a=await Ve({id:R.value,name:_.value,description:g.value},S.value);b.value=!1,y("positive","Tipo de gasto actualizado correctamente"),t.toggleModal(),q.value=[],w()}catch{b.value=!1,y("negative","Ocurrió un error, por favor verifique los datos")}_.value="",g.value=""}async function ce(a){f.value=!0;try{const n=await Ie(a,S.value);y("positive","Tipo de gasto activado correctamente"),f.value=!1,q.value=[],x.value=[],w()}catch{f.value=!1,y("negative","Ocurrió un error")}}async function re(a){f.value=!1;try{const n=await Ae(a,S.value);f.value=!1,y("positive","Tipo de gasto desactivado correctamente"),q.value=[],x.value=[],w()}catch{f.value=!1,y("negative","Ocurrió un error")}}const S=Q(()=>Y.idSelected);return ge(S,()=>{w()}),ye(()=>{w()}),(a,n)=>{const O=d("q-separator"),u=d("q-tab"),ie=d("q-tabs"),F=d("q-icon"),P=d("q-input"),z=d("q-tooltip"),M=d("q-btn"),$=d("q-btn-group"),j=d("q-table"),W=d("q-tab-panel"),ue=d("q-tab-panels"),de=d("q-card"),pe=d("q-spinner-ios");return V(),H(he,null,[c("div",Oe,[c("div",Ce,[c("i",{class:"icon icon-backRoute q-pt-lg",onClick:n[0]||(n[0]=o=>a.$router.back())}),Ee]),e(O,{class:"separator"}),c("div",De,[e(ke,{onOnClick:ae,label:"Crear tipo de gasto"}),c("div",ze,[e(de,null,{default:s(()=>[e(ie,{modelValue:p(h),"onUpdate:modelValue":n[1]||(n[1]=o=>k(h)?h.value=o:h=o),dense:"",class:"text-grey","active-color":"primary","indicator-color":"primary",align:"justify","narrow-indicator":""},{default:s(()=>[e(u,{name:"active",label:"Activos"}),e(u,{name:"inactive",label:"Inactivos"})]),_:1},8,["modelValue"]),e(O),e(ue,{modelValue:p(h),"onUpdate:modelValue":n[4]||(n[4]=o=>k(h)?h.value=o:h=o),animated:""},{default:s(()=>[e(W,{name:"active"},{default:s(()=>[e(j,{flat:"",bordered:"",title:"Gastos","row-key":"name",rows:q.value,columns:U.value,filter:p(m),loading:f.value,"rows-per-page-options":[5,10,20]},{"top-right":s(()=>[e(P,{borderless:"",dense:"",debounce:"300",modelValue:p(m),"onUpdate:modelValue":n[2]||(n[2]=o=>k(m)?m.value=o:m=o),placeholder:"Search"},{append:s(()=>[e(F,{name:"search"})]),_:1},8,["modelValue"])]),"body-cell-Acciones":s(o=>[c("td",Me,[e($,{class:"full-width full-height",outline:"",square:""},{default:s(()=>[e(M,{icon:"edit_note","text-color":"blue-10",class:"col text-bold q-pa-none icon-table",onClick:L=>ne(o.row)},{default:s(()=>[e(z,{class:"bg-indigo",offset:[10,10]},{default:s(()=>[A(" Editar ")]),_:1})]),_:2},1032,["onClick"]),e(M,{icon:"highlight_off","text-color":"blue-10",class:"col text-bold q-pa-none icon-table",onClick:L=>re(o.row._id)},{default:s(()=>[e(z,{class:"bg-indigo",offset:[10,10]},{default:s(()=>[A(" Desactivar ")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)])]),_:1},8,["rows","columns","filter","loading"])]),_:1}),e(W,{name:"inactive"},{default:s(()=>[e(j,{flat:"",bordered:"",title:"Gastos","row-key":"name",rows:x.value,columns:U.value,filter:p(m),loading:f.value,"rows-per-page-options":[5,10,20]},{"top-right":s(()=>[e(P,{borderless:"",dense:"",debounce:"300",modelValue:p(m),"onUpdate:modelValue":n[3]||(n[3]=o=>k(m)?m.value=o:m=o),placeholder:"Search"},{append:s(()=>[e(F,{name:"search"})]),_:1},8,["modelValue"])]),"body-cell-Acciones":s(o=>[c("td",Ne,[e($,{class:"full-width full-height",outline:"",square:""},{default:s(()=>[e(M,{"text-color":"blue-10",class:"col q-pa-none",onClick:L=>ce(o.row._id)},{default:s(()=>[Be,e(z,{class:"bg-indigo",offset:[10,10]},{default:s(()=>[A(" Activar ")]),_:1})]),_:2},1032,["onClick"])]),_:2},1024)])]),_:1},8,["rows","columns","filter","loading"])]),_:1})]),_:1},8,["modelValue"])]),_:1})])])]),p(t).modalIsOpen?(V(),N(be,{key:0,class:"modal"},{default:s(()=>[c("div",Re,[c("h6",Ge,qe(v.value),1),c("div",Ue,[c("div",Fe,[e(K,{class:"q-pb-xs",label:"Nombre",required:!0,type:"text",ruless:Z,value:p(E),modelValue:p(_),"onUpdate:modelValue":n[5]||(n[5]=o=>k(_)?_.value=o:_=o),onOnWrite:ee},null,8,["value","modelValue"]),e(K,{label:"Descripción",type:"text",required:!1,value:p(D),modelValue:p(g),"onUpdate:modelValue":n[6]||(n[6]=o=>k(g)?g.value=o:g=o),onOnWrite:te},null,8,["value","modelValue"]),Pe,c("div",$e,[C.value?(V(),N(X,{key:0,disable:p(G),onOnClick:se},null,8,["disable"])):(V(),N(X,{key:1,disable:p(G),onOnClick:le},null,8,["disable"]))]),b.value?(V(),H("div",je,[e(pe,{color:"primary",size:"2.5em"})])):J("",!0)])])])]),_:1})):J("",!0)],64)}}},He=ve(We,[["__scopeId","data-v-c8a7ecfc"]]);export{He as default};