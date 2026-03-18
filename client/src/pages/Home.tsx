import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-white relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 2px, #f3f4f6 2px, #f3f4f6 4px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto flex-1 border">
        <Hero />
        <Features />
      </div>
    </div>
  );
};

export default Home;
