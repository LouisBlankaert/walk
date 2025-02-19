export default function Hero() {
  return (
    <div className="absolute inset-0">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute min-w-full min-h-full object-cover"
        >
          <source src="/videos/hero_bg.mp4" type="video/mp4" />
        </video>
        {/* Overlay sombre semi-transparent */}
        <div className="absolute inset-0 bg-black/30" />
      </div>
    </div>
  );
}
