function TeamMember(props) {
  return (
    <div className="member-card">
      <h3>{props.name}</h3>
      <p>{props.role}</p>
    </div>
  );
}

export default TeamMember; 