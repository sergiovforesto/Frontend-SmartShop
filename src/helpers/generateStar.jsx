export function generateStar(ratingProduct, star) {
    if (ratingProduct < 1 || ratingProduct > 5) {
      console.error("error to generate starts");
    }
  
    let starts = [];
    for (let i = 0; i < ratingProduct; i++) {
      starts.push(star);
    }
  
    return starts;
}

