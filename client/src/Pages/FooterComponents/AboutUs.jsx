/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  return (
    <div className="mx-auto px-4">
      <Helmet>
        <title>Notes | About ❤️</title>
      </Helmet>
      <div className="hero min-h-screen">
        <div className="p-5">
          <SectionTitle heading={"About Us"} />
          <div className=" text-gray-700">
            <p className="text-base mb-4">
              <span className="text-cyan-400 font-bold ">Introduction:</span>
              Welcome to our Task management Application, where the art of
              capturing and organizing ideas seamlessly comes to life. Our
              platform is designed to empower you with a user-friendly
              interface, cutting-edge features, and a commitment to enhancing
              your productivity. Whether you're a student, professional, or
              simply someone who loves jotting down thoughts, we're here to make
              your note-taking experience smoother and more enjoyable.
            </p>

            <p className="mb-4">
              <span className="font-bold">Our Mission:</span> At This Website,
              our mission is to revolutionize the way you capture, manage, and
              access information. We understand that your thoughts and ideas are
              invaluable, and we're dedicated to providing you with a platform
              that helps you preserve and leverage them effortlessly. Our goal
              is to be your trusted companion on your journey of creativity,
              learning, and productivity.
            </p>

            <p className="mb-4">
              <span className=" text-pink-700 underline">
                What Sets Us Apart:
              </span>
            </p>
            <ul className="list-disc list-inside text-gray-600 pl-6 mb-4">
              <li>
                <span className="font-bold">Intuitive Interface:</span> Our
                user-centric design ensures that you can start taking notes with
                minimal learning curve. Whether you're a tech-savvy individual
                or a newcomer, our platform is built to be accessible to
                everyone.
              </li>
              <li>
                <span className="font-bold">Cross-Device Syncing:</span>{" "}
                Seamlessly transition between your computer, tablet, and
                smartphone. Your notes are always at your fingertips, no matter
                where you are.
              </li>
              <li>
                <span className="font-bold">Versatile Organization:</span>{" "}
                Tagging, folders, and customizable categories allow you to
                organize your notes in a way that suits your unique style. Say
                goodbye to the chaos of scattered thoughts!
              </li>
              <li>
                <span className="font-bold">Rich Media Integration:</span>{" "}
                Capture inspiration in all its forms. Our platform supports
                images, audio, video, and more, ensuring that your notes are as
                dynamic as your ideas.
              </li>
              <li>
                <span className="font-bold">Collaboration Made Easy:</span>{" "}
                Share notes with colleagues, classmates, or friends. Collaborate
                in real-time, provide feedback, and collectively refine your
                ideas.
              </li>
              <li>
                <span className="font-bold">Robust Search:</span> Find what you
                need, when you need it. Our powerful search functionality helps
                you retrieve notes with precision, saving you time and
                frustration.
              </li>
              <li>
                <span className="font-bold">Privacy and Security:</span> Your
                data's security is our priority. We utilize state-of-the-art
                encryption and security measures to keep your notes safe and
                confidential.
              </li>
            </ul>

            <p>
              Our highly qualified team of instructors is passionate about
              education and committed to creating memorable experiences for
              every camper. With a diverse range of activities and classes, we
              aim to cater to the individual interests and talents of each
              child.
            </p>

            {/* Add more paragraphs here */}
          </div>
          <Link to="/">
            <button className="btn btn-primary justify-center mt-5">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
