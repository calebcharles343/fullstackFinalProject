import Students from "../features/student/Students";

const StudentsTable: React.FC = () => {
  return (
    <div
      className="h-max "
      style={{ fontFamily: "Roboto", letterSpacing: "0.8px" }}
    >
      <Students />
    </div>
  );
};

export default StudentsTable;
