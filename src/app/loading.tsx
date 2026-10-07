/** Shown the moment a link is clicked, if the next page isn't ready yet. */
export default function Loading() {
  return (
    <p className="faint" aria-live="polite">
      <span className="ps1">$ </span>loading<span className="caret" />
    </p>
  );
}
