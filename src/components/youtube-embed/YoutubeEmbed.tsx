
interface props {
  embedid?: string;
};

const YoutubeEmbed = ({ embedid }: props) => {
  if (!embedid) return null;

  return (
    <div className="relative h-0 overflow-hidden pb-[56.25%]">
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube.com/embed/${embedid}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  )
};

export default YoutubeEmbed;
