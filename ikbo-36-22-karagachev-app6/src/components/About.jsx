import TeamMember from './TeamMember';

function About() {
    const teamMembers = [
      { id: 1, name: "Иван", role: "Разработчик" },
      { id: 2, name: "Жорик", role: "Дизайнер" }
    ];
  
    return (
      <div className="page">
        <h1>О нас</h1>
        <div className="team-members">
          {teamMembers.map(member => (
            <TeamMember 
              key={member.id}
              name={member.name}
              role={member.role}
            />
          ))}
        </div>
      </div>
    );
  }
  
  export default About;