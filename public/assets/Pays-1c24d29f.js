import{g as L,b as U}from"./index-fc7ae345.js";import{_ as j,v as G,a5 as H,f as n,y as Q,l as J,z as K,A as W,r,o as S,c as X,a as e,d as s,w as l,g as c,h as A,M as Y,j as C,F as Z,i as ee,k as u,t as p,p as te,e as oe}from"./index-a44cf2ec.js";const f=b=>(te("data-v-237ffce4"),b=b(),oe(),b),ae={class:"q-py-md table-container"},se={class:"row"},le=f(()=>e("h6",{class:"title q-my-lg"},"PENDIENTES DE PAGO",-1)),ne={class:"container-content"},re={class:"container-table q-mt-md q-pa-md",rounded:""},ce={class:"accions-td"},de={class:"modalSystem"},ie={class:"q-my-md text-center"},ue={class:"row q-px-xl"},fe={class:"column col-12",style:{"font-size":"16px"}},_e={class:"q-pb-sm"},pe=f(()=>e("span",{class:"text-bold"},"Cliente:",-1)),he={class:"q-pb-sm"},be=f(()=>e("span",{class:"text-bold"},"Estado de la orden:",-1)),ve={class:"q-pb-sm"},ge=f(()=>e("span",{class:"text-bold"},"Estado del pago:",-1)),me={class:"q-pb-sm"},ye=f(()=>e("span",{class:"text-bold"},"Fecha de entrega:",-1)),we={class:"q-pb-sm"},qe=f(()=>e("span",{class:"text-bold"},"Valor total:",-1)),Se={class:"q-pb-sm column"},xe=f(()=>e("span",{class:"text-bold"},"Detalle del pedido:",-1)),Ee={class:"column"},ke={__name:"Pays",setup(b){const O=G(),x=H(),E=n(""),d=n(!1),v=n([]),k=n([]),m=n([]),V=Q();let _=n(""),h=n("");const I=n([{name:"Acciones",field:"acciones",align:"left",sortable:!0,headerStyle:"font-weight: bold;",style:"width: 10px"},{name:"name",label:"Nombre",field:"name",align:"left",sortable:!0,headerStyle:"font-weight: bold;"},{name:"unitvalue",label:"Valor unitario",field:"unitvalue",align:"left",sortable:!0,headerStyle:"font-weight: bold;"},{name:"quantity",label:"Cantidad",field:"quantity",align:"left",sortable:!0,headerStyle:"font-weight: bold;"},{name:"cost",label:"Total",field:"cost",align:"left",sortable:!0,headerStyle:"font-weight: bold;"}]),P=n([{name:"id",label:"#",field:"id",align:"left",sortable:!0,headerStyle:"font-size: var(--font-large); font-weight: bold;",style:"font-size: var(--font-large);"},{name:"client",label:"Cliente",field:"client",align:"left",sortable:!0,headerStyle:"font-size: var(--font-large); font-weight: bold;",style:"font-size: var(--font-large);"},{name:"statusorder",label:"Estado de orden",field:"statusorder",align:"left",sortable:!0,headerStyle:"font-size: var(--font-large); font-weight: bold;",style:"font-size: var(--font-large);"},{name:"dateorder",label:"Fecha entrega",field:"dateorder",align:"left",sortable:!0,headerStyle:"font-size: var(--font-large); font-weight: bold;",style:"font-size: var(--font-large);"},{name:"Acciones",label:"Acciones",field:"acciones",align:"left",sortable:!0,headerStyle:"font-size: var(--font-large); font-weight: bold;",style:"font-size: var(--font-large);"}]),T=o=>{m.value=[];let a=1;E.value="DETALLE DE LA ORDEN",_.value=o,o.models.forEach(g=>{g.id=a++,m.value.push(g)}),x.toggleSHowDetailsModal()},y=(o,a)=>{O.notify({type:o,message:a,position:"top"})};async function w(){v.value=[],k.value=[],d.value=!0;try{const{orders:o}=await L(q.value);d.value=!1;let a=1;o&&o.forEach(t=>{t.status=t.status?"Inactivo":"Activo",t.statuspay=="PENDIENTE"&&(t.id=a++,v.value.push(t)),t.client=t.client.name,t.dateorder=t.dateorder.slice(0,t.dateorder.indexOf("T"))})}catch{d.value=!1,y("negative","Ocurrió un error al obtener las ordenes")}}async function F(o){d.value=!0;try{await U(o,q.value),y("positive","Pedido pagado correctamente"),d.value=!1,v.value=[],k.value=[],w()}catch{d.value=!1,y("negative","Ocurrió un error al verificar el pago")}}const q=J(()=>V.idSelected);return K(q,()=>{w()}),W(()=>{w()}),(o,a)=>{const t=r("q-separator"),g=r("q-icon"),M=r("q-input"),N=r("q-tooltip"),z=r("q-btn"),B=r("q-btn-group"),D=r("q-table"),R=r("q-card");return S(),X(Z,null,[e("div",ae,[e("div",se,[e("i",{class:"icon icon-backRoute q-pt-lg",onClick:a[0]||(a[0]=i=>o.$router.back())}),le]),s(t,{class:"separator"}),e("div",ne,[e("div",re,[s(R,null,{default:l(()=>[s(t),s(D,{flat:"",bordered:"",title:"Pedidos","row-key":"id",rows:v.value,columns:P.value,filter:c(h),loading:d.value,"rows-per-page-options":[5,10,20]},{"top-right":l(()=>[s(M,{borderless:"",dense:"",debounce:"300",modelValue:c(h),"onUpdate:modelValue":a[1]||(a[1]=i=>ee(h)?h.value=i:h=i),placeholder:"Buscar"},{append:l(()=>[s(g,{name:"search"})]),_:1},8,["modelValue"])]),"body-cell-Acciones":l(i=>[e("td",ce,[s(B,{class:"full-width full-height",outline:"",square:""},{default:l(()=>[s(z,{icon:"visibility","text-color":"blue-10",class:"col text-bold q-pa-none icon-table",onClick:$=>T(i.row)},{default:l(()=>[s(N,{class:"bg-indigo",offset:[10,10]},{default:l(()=>[u(" Ver detalles ")]),_:1})]),_:2},1032,["onClick"]),i.row.statuspay=="PENDIENTE"?(S(),A(z,{key:0,icon:"payment","text-color":"blue-10",class:"col text-bold q-pa-none icon-table",onClick:$=>F(i.row._id)},{default:l(()=>[s(N,{class:"bg-indigo",offset:[10,10]},{default:l(()=>[u(" Marcar como pago ")]),_:1})]),_:2},1032,["onClick"])):C("",!0)]),_:2},1024)])]),_:1},8,["rows","columns","filter","loading"])]),_:1})])])]),c(x).modalShowIsOpen?(S(),A(Y,{key:0,class:"modal",showDetail:!0},{default:l(()=>[e("div",de,[e("h6",ie,p(E.value),1),e("div",ue,[e("div",fe,[e("div",_e,[pe,u(" "+p(c(_).client),1)]),e("div",he,[be,u(" "+p(c(_).statusorder),1)]),e("div",ve,[ge,u(" "+p(c(_).statuspay),1)]),e("div",me,[ye,u(" "+p(c(_).dateorder),1)]),e("div",we,[qe,u(" "+p(c(_).total),1)]),e("div",Se,[xe,e("div",Ee,[s(D,{flat:"",bordered:"",style:{"max-width":"300px"},"row-key":"codigo",rows:m.value,columns:I.value,"rows-per-page-options":[5,10,20]},null,8,["rows","columns"])])])])])])]),_:1})):C("",!0)],64)}}},De=j(ke,[["__scopeId","data-v-237ffce4"]]);export{De as default};
