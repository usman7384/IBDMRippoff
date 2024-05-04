const ReviewModal = ({ id, reviews }) => {
  return (
    <div>
      <dialog id={id} className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Reviews</h3>
          {
            reviews?.map((review) => {
              return (
                <div className="flex flex-row justify-between">
                <div className="chat chat-start">
                  <div className="chat-bubble chat-bubble-primary">
                    {review.description}
                  </div>
                </div>
                <div className="rating">
                    {
                        Array.from({length: review.stars}, (_, index) => {
                            return <input type="radio" name="rating-4" className="mask mask-star-2 bg-green-500" readOnly disabled  />
                        })
                    }

                </div>
                </div>
                )

              
            })
          }

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ReviewModal;
