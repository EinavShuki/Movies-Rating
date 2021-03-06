import "./Reviews.css";
import "./mediaReviews.css";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Rating from "../Rating/Rating";
import AllReviews from "../AllReviews/AllReviews";

const Reviews = ({ id, watchAll }) => {
  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(0);
  const [revToShow, setRevToShow] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % revToShow.length);
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [revToShow]);

  useEffect(() => {
    const ourRequest = axios.CancelToken.source();
    async function fetchReviews() {
      try {
        const config = {
          Headers: { "Content-Type": "aplication/json" },
        };
        const { data } = await axios.get(
          `/api/movies/${id}/reviews`,
          { cancelToken: ourRequest.token },
          config
        );
        setReviews(data.reviews);
      } catch (err) {
        console.log(err);
      }
    }
    fetchReviews();
    return () => {
      ourRequest.cancel("Cancelling in cleanup in Reviews");
    };
  }, []);

  useEffect(() => {
    setRevToShow(reviews.filter((review) => review.comment.length <= 100));
  }, [reviews]);

  return (
    <>
      <div className="reviews_box">
        {" "}
        <img src="\img\star.png" id="star" />
        <div id="review_p">
          {revToShow.length > 1 ? (
            <span>
              <Rating
                className="fadeIn"
                id="rev_rating"
                value={revToShow[index].rating}
              />
              <>
                <img src="\img\quotes-right.png" id="left_q" />
                <h4
                  className="fadeIn"
                  style={{
                    textAlign: "center",
                    padding: "0.3rem",
                  }}
                >
                  {revToShow[index].comment}
                </h4>
                <img src="\img\quotes-right.png" id="right_q" />
              </>
              <p
                className="fadeIn"
                style={{
                  position: "relative",
                  textAlign: "end",
                  fontStyle: "italic",
                  paddingRight: "0.3rem",
                }}
              >
                {revToShow[index].name}
              </p>
            </span>
          ) : (
            <h3 style={{ textAlign: "center" }}>No highlight reviews yet</h3>
          )}
        </div>
      </div>
      <div id="all_rev_table">
        {watchAll && <AllReviews reviews={reviews} />}
      </div>
    </>
  );
};

export default Reviews;
