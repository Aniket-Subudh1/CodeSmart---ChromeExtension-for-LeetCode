"Use Client";
import HintPanel from "./HintPanel";
import CodeFeedback from "./CodeFeedback";
import ChatPanel from "./ChatPanel";
import VizPanel from "./VizPanel";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h1 className="text-lg font-bold mb-4">CodeSmart</h1>
      <HintPanel />
      <CodeFeedback />
      <ChatPanel />
      <VizPanel />
    </div>
  );
}
