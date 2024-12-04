interface ClassifiedDetailsProps {
  title: string;
  description: string;
  category: string;
  location: string | null;
}

const ClassifiedDetails = ({ title, description, category, location }: ClassifiedDetailsProps) => {
  return (
    <div className="p-6">
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{category}</span>
        <span>{location}</span>
      </div>
    </div>
  );
};

export default ClassifiedDetails;