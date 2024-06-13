import Image from "next/image";

export default function HeaderLogo() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="rounded-lg bg-bg p-2">
        <Image
          src={"/images/scoreboardLogo.png"}
          alt="logo"
          width={80}
          height={80}
        />
      </div>
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Welcome to Scoreboard!</h1>
        <p className="text-muted-foreground">Let&apos;s play!</p>
      </div>
    </div>
  );
}
