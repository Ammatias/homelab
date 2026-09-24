import{b as c,d as u,e as $,f as l,g as r}from"./index-BN0wsGwK.js";

const i=(e,t)=>`/servers/${e}/vs/${t}/clients`;
const d={
  list:(e,t)=>c.get(i(e,t)).then(s=>s.data),
  get:(e,t,s)=>c.get(`${i(e,t)}/${s}`).then(n=>n.data),
  database:(e,t,s=0,n=500)=>c.get(`${i(e,t)}/database`,{params:{start:s,duration:n}}).then(a=>a.data),
  kick:(e,t,s,n,a)=>c.post(`${i(e,t)}/${s}/kick`,{reasonid:n,reasonmsg:a}).then(o=>o.data),
  ban:(e,t,s,n,a)=>c.post(`${i(e,t)}/${s}/ban`,{time:n,banreason:a}).then(o=>o.data),
  move:(e,t,s,n)=>c.post(`${i(e,t)}/${s}/move`,{cid:n}).then(a=>a.data),
  poke:(e,t,s,n)=>c.post(`${i(e,t)}/${s}/poke`,{msg:n}).then(a=>a.data),
  message:(e,t,s,n)=>c.post(`${i(e,t)}/${s}/message`,{msg:n}).then(a=>a.data)
};

function f(){
  const{selectedConfigId:e,selectedSid:t}=u();
  return $({queryKey:["clients",e,t],queryFn:()=>d.list(e,t),enabled:!!e&&!!t,refetchInterval:1e4})
}

function v(){
  const{selectedConfigId:e,selectedSid:t}=u();
  return $({queryKey:["client-database",e,t],queryFn:()=>d.database(e,t,0,500),enabled:!!e&&!!t,refetchInterval:6e4})
}

function g(){
  const e=l(),{selectedConfigId:t,selectedSid:s}=u();
  return r({mutationFn:({clid:n,reasonid:a,reasonmsg:o})=>d.kick(t,s,n,a,o),onSuccess:()=>e.invalidateQueries({queryKey:["clients"]})})
}

function k(){
  const e=l(),{selectedConfigId:t,selectedSid:s}=u();
  return r({mutationFn:({clid:n,time:a,banreason:o})=>d.ban(t,s,n,a,o),onSuccess:()=>e.invalidateQueries({queryKey:["clients"]})})
}

function m(){
  const{selectedConfigId:e,selectedSid:t}=u();
  return r({mutationFn:({clid:s,msg:n})=>d.poke(e,t,s,n)})
}

export{g as a,k as b,m as c,v as d,f as u};
