import{c as _,d as D,a as b,b as api,r,j as e,D as M,E as S,B as o,F as P,G as d,I as B,y as m,J as K,U as A,P as E,v as I}from"./index-BN0wsGwK.js";
import{u as L,a as U,b as F,c as T,d as W}from"./use-clients-on4dZ9L5.js";
import{D as $}from"./DataTable-DP84Y_fn.js";
import{B as u}from"./badge-BajT9dba.js";
import{I as z}from"./input-B2unZUJq.js";
import{L as H}from"./label-BZ6NuKNx.js";
import{D as O,a as Z,b as G,c as J,d as R}from"./dialog-KNE6Lysi.js";
import{E as q}from"./EmptyState-r_eQDTkU.js";
import{Z as k}from"./zap-cmYAptwM.js";
import"./search-djhUG7BL.js";
import"./x-DyyF97Ps.js";

/** @license lucide-react v0.460.0 - ISC */
const Q=_("Ellipsis",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]]);

const formatTimestamp=value=>{
  const seconds=Number(value);
  return seconds?new Date(seconds*1000).toLocaleString():"-";
};

function re(){
  const{selectedConfigId:y,selectedSid:C}=D();
  const isAdmin=b(n=>n.isAdmin());
  const{data:i,isLoading:N}=L();
  const{data:registeredData,isLoading:registeredLoading}=W();
  const kick=U(),ban=F(),poke=T();
  const[selectedClient,setSelectedClient]=r.useState(null);
  const[message,setMessage]=r.useState("");
  const[view,setView]=r.useState("online");
  const[groupClient,setGroupClient]=r.useState(null);
  const[serverGroups,setServerGroups]=r.useState([]);
  const[assignedGroups,setAssignedGroups]=r.useState(new Set());
  const[groupsLoading,setGroupsLoading]=r.useState(false);
  const[groupSaving,setGroupSaving]=r.useState(null);

  const online=r.useMemo(()=>!i||!Array.isArray(i)?[]:i.filter(n=>String(n.client_type)==="0"),[i]);
  const registered=r.useMemo(()=>Array.isArray(registeredData)?registeredData:[],[registeredData]);
  const onlineDatabaseIds=r.useMemo(()=>new Set(online.map(n=>String(n.client_database_id))),[online]);

  async function openGroupManager(client){
    setGroupClient(client);
    setGroupsLoading(true);
    try{
      const base=`/servers/${y}/vs/${C}`;
      const[groupsResponse,assignedResponse]=await Promise.all([
        api.get(`${base}/server-groups`),
        api.get(`${base}/clients/${client.cldbid}/groups`)
      ]);
      setServerGroups((Array.isArray(groupsResponse.data)?groupsResponse.data:[]).filter(group=>String(group.type)==="1"&&String(group.sgid)!=="8"));
      setAssignedGroups(new Set((Array.isArray(assignedResponse.data)?assignedResponse.data:[]).map(group=>String(group.sgid))));
    }catch(error){
      m.error("Failed to load server groups");
      setGroupClient(null);
    }finally{
      setGroupsLoading(false);
    }
  }

  async function toggleGroup(group){
    if(!groupClient||groupSaving)return;
    const sgid=String(group.sgid),cldbid=String(groupClient.cldbid);
    const assigned=assignedGroups.has(sgid);
    setGroupSaving(sgid);
    try{
      const base=`/servers/${y}/vs/${C}/server-groups/${sgid}/members`;
      if(assigned)await api.delete(`${base}/${cldbid}`);
      else await api.post(base,{cldbid});
      setAssignedGroups(current=>{
        const next=new Set(current);
        if(assigned)next.delete(sgid);else next.add(sgid);
        return next;
      });
      m.success(`${group.name} ${assigned?"removed":"assigned"}`);
    }catch(error){
      m.error(`Failed to ${assigned?"remove":"assign"} ${group.name}`);
    }finally{
      setGroupSaving(null);
    }
  }

  const onlineColumns=r.useMemo(()=>{
    const columns=[
      {accessorKey:"client_nickname",header:"Nickname",cell:({row:s})=>e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-mono-data text-primary",children:s.original.client_nickname?.[0]?.toUpperCase()||"?"}),e.jsx("span",{className:"font-medium",children:s.original.client_nickname})]})},
      {accessorKey:"client_country",header:"Country",cell:({getValue:s})=>e.jsx("span",{className:"font-mono-data text-xs",children:s()||"-"})},
      {accessorKey:"client_idle_time",header:"Idle",cell:({getValue:s})=>e.jsx("span",{className:"font-mono-data text-xs text-muted-foreground",children:I(Math.floor(s()/1e3))})},
      {accessorKey:"client_away",header:"Status",cell:({row:s})=>s.original.client_away?e.jsx(u,{variant:"warning",className:"text-[10px]",children:"Away"}):s.original.client_input_muted?e.jsx(u,{variant:"secondary",className:"text-[10px]",children:"Muted"}):e.jsx(u,{variant:"success",className:"text-[10px]",children:"Active"})}
    ];
    if(isAdmin)columns.push({id:"actions",header:"",cell:({row:s})=>{
      const client=s.original;
      return e.jsxs(M,{children:[e.jsx(S,{asChild:true,children:e.jsx(o,{variant:"ghost",size:"icon",className:"h-7 w-7",children:e.jsx(Q,{className:"h-4 w-4"})})}),e.jsxs(P,{align:"end",children:[e.jsxs(d,{onClick:()=>{setSelectedClient({clid:client.clid,name:client.client_nickname});setMessage("")},children:[e.jsx(k,{className:"mr-2 h-4 w-4"})," Poke"]}),e.jsxs(d,{onClick:()=>{kick.mutate({clid:client.clid,reasonid:5,reasonmsg:"Kicked by admin"});m.success(`Kicked ${client.client_nickname}`)},children:[e.jsx(B,{className:"mr-2 h-4 w-4"})," Kick from Server"]}),e.jsxs(d,{className:"text-destructive focus:text-destructive",onClick:()=>{ban.mutate({clid:client.clid,time:3600,banreason:"Banned by admin"});m.success(`Banned ${client.client_nickname}`)},children:[e.jsx(K,{className:"mr-2 h-4 w-4"})," Ban (1 hour)"]})]})]})
    }});
    return columns;
  },[isAdmin,kick,ban]);

  const registeredColumns=r.useMemo(()=>{
    const columns=[
      {accessorKey:"client_nickname",header:"Nickname",cell:({row:s})=>e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{className:"h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-mono-data text-primary",children:s.original.client_nickname?.[0]?.toUpperCase()||"?"}),e.jsx("span",{className:"font-medium",children:s.original.client_nickname||"Unknown"})]})},
      {id:"status",header:"Status",cell:({row:s})=>s.original.client_unique_identifier==="ServerQuery"?e.jsx(u,{variant:"secondary",className:"text-[10px]",children:"Service"}):onlineDatabaseIds.has(String(s.original.cldbid))?e.jsx(u,{variant:"success",className:"text-[10px]",children:"Online"}):e.jsx(u,{variant:"secondary",className:"text-[10px]",children:"Offline"})},
      {accessorKey:"cldbid",header:"ID",cell:({getValue:s})=>e.jsx("span",{className:"font-mono-data text-xs",children:s()})},
      {accessorKey:"client_created",header:"Registered",cell:({getValue:s})=>e.jsx("span",{className:"text-xs text-muted-foreground",children:formatTimestamp(s())})},
      {accessorKey:"client_lastconnected",header:"Last seen",cell:({getValue:s})=>e.jsx("span",{className:"text-xs text-muted-foreground",children:formatTimestamp(s())})},
      {accessorKey:"client_totalconnections",header:"Connections",cell:({getValue:s})=>e.jsx("span",{className:"font-mono-data text-xs",children:s()||"0"})}
    ];
    if(isAdmin)columns.push({id:"groups",header:"",cell:({row:s})=>s.original.client_unique_identifier==="ServerQuery"?null:e.jsx(o,{variant:"outline",size:"sm",onClick:()=>openGroupManager(s.original),children:"Groups"})});
    return columns;
  },[onlineDatabaseIds,isAdmin,y,C]);

  if(!y||!C)return e.jsx(q,{icon:A,title:"No server selected"});
  if(N||registeredLoading)return e.jsx(E,{});

  return e.jsxs("div",{className:"space-y-5",children:[
    e.jsxs("div",{className:"flex items-center justify-between gap-3",children:[
      e.jsxs("div",{children:[e.jsx("h1",{className:"text-xl font-semibold",children:"Clients"}),e.jsxs("p",{className:"text-sm text-muted-foreground mt-0.5",children:[online.length," online · ",registered.length," registered"]})]}),
      e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(o,{size:"sm",variant:view==="online"?"default":"outline",onClick:()=>setView("online"),children:"Online"}),e.jsx(o,{size:"sm",variant:view==="registered"?"default":"outline",onClick:()=>setView("registered"),children:"All registered"})]})
    ]}),
    view==="online"?e.jsx($,{columns:onlineColumns,data:online,searchKey:"client_nickname",searchPlaceholder:"Search online clients..."}):e.jsx($,{columns:registeredColumns,data:registered,searchKey:"client_nickname",searchPlaceholder:"Search registered users..."}),
    e.jsx(O,{open:!!selectedClient,onOpenChange:()=>setSelectedClient(null),children:e.jsxs(Z,{children:[e.jsx(G,{children:e.jsxs(J,{children:["Poke ",selectedClient?.name]})}),e.jsxs("div",{children:[e.jsx(H,{className:"text-xs",children:"Message"}),e.jsx(z,{value:message,onChange:n=>setMessage(n.target.value),placeholder:"Hey!",autoFocus:true})]}),e.jsxs(R,{children:[e.jsx(o,{variant:"outline",onClick:()=>setSelectedClient(null),children:"Cancel"}),e.jsxs(o,{onClick:()=>{if(selectedClient&&message){poke.mutate({clid:selectedClient.clid,msg:message});m.success(`Poked ${selectedClient.name}`);setSelectedClient(null)}},children:[e.jsx(k,{className:"h-4 w-4 mr-1"})," Poke"]})]})]})}),
    e.jsx(O,{open:!!groupClient,onOpenChange:open=>{if(!open)setGroupClient(null)},children:e.jsxs(Z,{className:"sm:max-w-md",children:[e.jsx(G,{children:e.jsxs(J,{children:["Server groups — ",groupClient?.client_nickname]})}),groupsLoading?e.jsx("div",{className:"py-8 flex justify-center",children:e.jsx(E,{})}):e.jsx("div",{className:"space-y-2",children:serverGroups.map(group=>{const checked=assignedGroups.has(String(group.sgid));return e.jsxs("label",{className:"flex items-center justify-between gap-3 rounded-md border border-border px-3 py-2 cursor-pointer hover:bg-muted/30",children:[e.jsxs("span",{children:[e.jsx("span",{className:"text-sm font-medium",children:group.name}),e.jsxs("span",{className:"ml-2 text-[10px] font-mono-data text-muted-foreground",children:["#",group.sgid]})]}),e.jsx("input",{type:"checkbox",checked,onChange:()=>toggleGroup(group),disabled:groupSaving!==null,className:"h-4 w-4 accent-primary"})]},group.sgid)})}),e.jsx(R,{children:e.jsx(o,{variant:"outline",onClick:()=>setGroupClient(null),children:"Close"})})]})})
  ]})
}

export{re as default};
