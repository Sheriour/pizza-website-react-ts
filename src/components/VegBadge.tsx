import { IngredientDiet } from "../Types";

type VegBadgeProps = {
  diet: IngredientDiet;
};

function VegBadge({ diet }: VegBadgeProps) {
  let badgeText = diet === "vegetarian" ? "V" : diet === "vegan" ? "Ve" : "";

  return (
    <>
      {diet != "all" ? (
        <span
          className="badge text-bg-success rounded-pill ms-1 mb-2"
          data-test-id="veg-badge"
        >
          {badgeText}
        </span>
      ) : (
        ""
      )}
    </>
  );
}

export default VegBadge;
