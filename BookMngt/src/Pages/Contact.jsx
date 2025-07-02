import "./Contact.css";
import backgroundImg from "../assets/contact.jpg";

function Contact() {
    return (
        <div className="contact-page">
            <div
                className="contact-hero"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${backgroundImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "50vh",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    paddingTop:"150px",
                    
                }}
            >
                <h1>Contact Us</h1>
            </div>

            <div className="contact-content">
                <h2>Let's Start a Conversation:</h2>
                <div className="contact-body">
                    <div className="contact-info">
                        <p><strong>📍 Address:</strong> 123 Road, Gwalior, MadhyaPradesh</p>
                        <p><strong>📞 Phone:</strong> +91 7991117654</p>
                        <p><strong>📧 Email:</strong> supriyarathor68@gmail.com</p>
                    </div>
                
                <form action="" className="form">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" placeholder="Enter your name" />

                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" placeholder="Enter your Email" />

                    <label htmlFor="phone">Phone (Optional):</label>
                    <input type="text" id="pswd" placeholder="Enter your Phone No." />

                    <label htmlFor="message">Message:</label>
                    <textarea id="message" cols="30" placeholder="Enter your message" />

                    <button type="submit" className="send-btn">Send Message</button>
                </form>
            </div>
        </div>
        </div>
    );
}

export default Contact;
 