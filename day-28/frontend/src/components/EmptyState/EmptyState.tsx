interface EmptyCardProps {
  title: string;
  message: string;
}

const EmptyCard = ({ title, message }: EmptyCardProps) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default EmptyCard;
