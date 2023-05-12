import PromptCard from "./PromptCard";

//renders the profile information, including a heading with the profile name, a description, and a list of prompt cards.
const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      {/* Profile Heading */}
      <h1 className="head_text text-left">
        {/* Name with blue gradient */}
        <span className="blue_gradient">{name}</span> Profile
      </h1>
      {/* Profile Description */}
      <p className="desc text-left">{desc}</p>
      {/* Prompt Cards */}
      <div className="mt-10 prompt_layout">
        {/* Render prompt cards */}
        {data.map((post) => (
          //Each prompt card is rendered based on the data provided and includes options to handle editing and deleting of the prompt
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
