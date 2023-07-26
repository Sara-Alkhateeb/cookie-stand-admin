
export default function Footer({ numLocations }) {
    return (
        <footer className="p-4 mt-8 bg-green-700 text-green-100">
          <h1 className="text-2xl">  &copy; 2023 Cookie Stand Admin | {numLocations}  Locations World Wide </h1>
        </footer>
    );
}
