import React, { useState } from 'react';
import { handleDateFormat, requestWithVariable } from '../../../../utils';
import { queryDeleteReview, queryModifyReview } from '../../../../query';

export default function ReviewsEditProfilPageMember({ data }) {
  const [memberReviews, setMemberReviews] = useState(data.reviews);
  const [editModeId, setEditModeId] = useState(null);
  const [activeStar, setActiveStar] = useState(0);

  const deleteComment = async idToDelete => {
    const newComments = memberReviews.filter(comment => comment.id !== idToDelete);
    setMemberReviews(newComments);
    const variables = {
      deleteReviewId: idToDelete,
    };
    await requestWithVariable(queryDeleteReview, variables);
  };

  const handleChange = async (e, id, field) => {
    const value = e.target.value;

    const updatedReviews = memberReviews.map(review => {
      if (review.id === id) {
        return { ...review, [field]: field === 'rating' ? parseInt(value) : value };
      }
      return review;
    });
    setMemberReviews(updatedReviews);
  };

  const handleEditMode = id => {
    setEditModeId(id);
  };

  const handleStarClick = star => {
    setActiveStar(star);
    setNoteSelected(star);
  };

  const saveChanges = async (id, newComment, newRating) => {
    try {
      const variables = {
        modifyReviewId: id,
        input: {
          comment: newComment,
          rating: newRating,
        },
      };

      await requestWithVariable(queryModifyReview, variables);

      const updatedReviews = memberReviews.map(review => {
        if (review.id === id) {
          return { ...review, comment: newComment, rating: newRating };
        }
        return review;
      });

      setMemberReviews(updatedReviews);
      setEditModeId(null);
    } catch (error) {
      console.error('Erreur lors de la modification du commentaire :', error);
    }
  };

  return (
    <section className="flex flex-col items-center mr-12 w-9/10 lg:w-2/3 ml-12">
      <div className="w-full">
        <h4 className="mt-5 mb-5">Vos commentaires</h4>
        <div className="flex flex-col gap-4 lg:max-h-[500px] overflow-auto">
          {memberReviews &&
            memberReviews.map(review => (
              <div
                className="border border-primary-color h-full flex flex-col gap-2 relative rounded-md p-5 mr-5"
                key={review.id}
              >
                <div className="mb-3">
                  <div className="flex lg:block xl:flex justify-between">
                    <h5>
                      <a href={`/training/${review.training.id}`}>
                        {review.training.label}
                      </a>
                    </h5>
                    <div className="rating rating-md flex items-center">
                      <span className="font-bold mr-2">{review.rating}/5</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <input
                            key={i}
                            type="button"
                            className={
                              review.rating >= i + 1
                                ? 'mask mask-star-2 bg-orange-400 cursor-default'
                                : "mask mask-star-2 bg-orange-400' checked bg-gray-300 cursor-default"
                            }
                            disabled
                          ></input>
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="italic text-sm ml-2">
                    Le {handleDateFormat(review.created_at || Date.now())}
                  </span>
                </div>
                {editModeId === review.id ? (
                  <>
                    <textarea
                      className="border h-20"
                      value={review.comment}
                      onChange={e => handleChange(e, review.id, 'comment')}
                    />
                    <div className="rating">
                  {[1, 2, 3, 4, 5].map((star, index) => (
                    <input
                      key={index}
                      type="radio"
                      name="rating-2"
                      className={`mask mask-star-2 ${
                        star <= activeStar ? 'bg-orange-400' : 'bg-gray-300'
                      }`}
                      checked={star === activeStar}
                      onChange={() => handleStarClick(star)}
                    />
                  ))}
                </div>
                    <button
                      className="btn btn-success"
                      onClick={() => saveChanges(review.id, review.comment, review.rating)}
                    >
                      Enregistrer
                    </button>
                  </>
                ) : (
                  <>
                    <p>{review.comment}</p>
                    <div className="flex justify-between mt-3">
                      <button
                        type="button"
                        className="btn btn-error"
                        onClick={() => deleteComment(review.id)}
                      >
                        Supprimer
                      </button>
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => handleEditMode(review.id)}
                      >
                        Modifier
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}