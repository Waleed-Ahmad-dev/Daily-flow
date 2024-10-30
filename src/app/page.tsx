import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h1>Welcome to Daily Flow</h1>
      <UserButton />
    </div>
  );
}
