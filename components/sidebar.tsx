"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, BookOpen, FileText, Home, Headphones, Lightbulb, Settings, Sparkles } from "lucide-react";

const items = [
  ["Dashboard", "/dashboard", Home],
  ["Practice room", "/practice", Headphones],
  ["My progress", "/progress", BarChart3],
  ["Topics", "/topics", BookOpen],
  ["Docs & notes", "/notes", FileText],
] as const;

export function Sidebar(){
  const path=usePathname();
  return <aside className="sidebar">
    <Link href="/dashboard" className="brand"><span className="brand-mark"><Sparkles size={17}/></span> interviewprep</Link>
    <div className="nav-label">YOUR WORKSPACE</div>
    {items.map(([label,href,Icon])=><Link key={href} href={href} className={`nav-item ${path===href||path.startsWith(href+"/")?"active":""}`}><Icon size={17}/><span>{label}</span></Link>)}
    <div className="nav-label">QUICK TIP</div>
    <div className="tip"><Lightbulb size={15} style={{verticalAlign:"middle",marginRight:6}}/> Take a breath before you answer. A clear structure beats a fast response.</div>
    <div className="sidebar-bottom">
      <div className="user"><div className="avatar">S</div><div><strong style={{fontSize:13}}>Surya Ravula</strong><div className="muted" style={{fontSize:11}}>Signed in</div></div><Settings size={15} style={{marginLeft:"auto",color:"#777f99"}}/></div>
    </div>
  </aside>
}
