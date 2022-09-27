interface Props {
  avatarUrl?: string;
}

export function ProfileIcon({ avatarUrl }: Props) {
  return (
    <div className="border-white border-2 overflow-hidden w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
      {avatarUrl && <img className="object-cover w-[100%] h-[100%]" src={avatarUrl} alt="profile image" />}

      {!avatarUrl && (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
        </svg>
      )}
    </div>
  );
}
