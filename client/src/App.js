import React from "react";
import axios from "axios";

import "./App.css";

class App extends React.Component {
  state = {
    title: "",
    body: "",
    posts: [],
  };

  // Call getBlogPost() whenever component (page) mounts
  componentDidMount = () => {
    this.getBlogPost();
  };

  // Get/Fetch Data from MongoDB -> display data in client app
  getBlogPost = () => {
    axios
      .get("/api")
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data });
        console.log("Data has been received!!");
      })
      .catch(() => {
        alert("Error retrieving data!!!"); // DO NOT DO in real-world application; collect data properly
      });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  // Save Posts
  submit = (event) => {
    // event.preventDefault(); // stops browser from refreshing

    const payload = {
      title: this.state.title,
      body: this.state.body,
    };

    // Send HTTP Post Request
    axios({
      url: "/api/save",
      method: "POST",
      data: payload,
    })
      .then(() => {
        console.log("Data has been sent to the server");
        this.resetUserInputs(); // reset form
        this.getBlogPost(); // get latest updated value from database
      })
      .catch(() => {
        console.log("Internal server error");
      });
  };

  // Reset Form (after submit)
  resetUserInputs = () => {
    this.setState({
      title: "",
      body: "",
    });
  };

  // Display Data (submitted form) on Client App
  displayBlogPost = (posts) => {
    if (!posts.length) return null;

    return posts.map((post, index) => (
      <div key={index} className="blog-post__display">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
  };

  render() {
    console.log("State: ", this.state);

    //JSX
    return (
      <div className="app">
        <h2>Welcome to My Full Stack Development Blog</h2>
        <form onSubmit={this.submit}>
          <div className="form-input">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <textarea
              placeholder="Body"
              name="body"
              cols="30"
              rows="10"
              value={this.state.body}
              onChange={this.handleChange}
            ></textarea>
          </div>

          <button>Submit</button>
        </form>

        <div className="blog-post">
          {this.displayBlogPost(this.state.posts)}
        </div>
      </div>
    );
  }
}

export default App;
