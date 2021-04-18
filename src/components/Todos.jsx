const Todos = ({ TodoListItems }) => {
  return (
    <div className="todos">
      {TodoListItems.map((element) => (
        <div key={element.id}>
          <h3>{element.title}</h3>
          <div>{element.text}</div>
        </div>
      ))}
    </div>
  );
};

export default Todos;
