import TouchTracker from "@/components/TouchTracker";

export default function Home() {
  const handleIntersect = () => {
    console.log("Pointer is inside the red box!");
    alert('pp')
  };

  return (
    <main>
        <TouchTracker onIntersect={handleIntersect} />
    </main>
  );
}