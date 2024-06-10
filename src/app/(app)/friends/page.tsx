import Loading from "@/app/loading";
import FriendSearch from "@/components/friends/FriendSearch";
import FriendsList from "@/components/friends/FriendsList";
import { getFriends } from "@/lib/api/friends/queries";
import { getUser } from "@/lib/api/user/queries";
import { checkAuth } from "@/lib/auth/utils";
import { Suspense } from "react";

export default async function FriendsPage() {
  return (
    <main className="relative space-y-6 pt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="my-2 text-2xl font-bold">Friends</h1>
        </div>
        <FriendSearch />
      </div>
      <UserView />
    </main>
  );
}

const UserView = async () => {
  await checkAuth();
  const { user } = await getUser();
  const { friends } = await getFriends();

  return (
    <Suspense fallback={<Loading />}>
      <FriendsList friends={friends} userId={user!.id} />
    </Suspense>
  );
};
