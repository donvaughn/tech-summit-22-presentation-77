import { ProfileIcon } from './ProfileIcon';
import { Comments } from './Comments';
import { Thumb } from './Thumb';
import { usePresentationComments } from '../hooks/use-presentation-comments';
import { useUpvotes } from '../hooks/use-upvotes';
import { useWallet } from '../hooks/use-wallet';
import { Links } from './Links';

interface PresentationProfileData {
  headerBg?: string;
  avatar?: string;
  title: string;
  subtitle?: string;
  description?: string;
  location?: string;
  locationLink?: string;
  presenter?: string;
}

const presentationProfileData: PresentationProfileData = {
  headerBg: 'assets/bg9.jpg',
  avatar: 'assets/bg4.jpg',
  title: 'Arweave - the Future of Web?',
  subtitle: ' Blockchain technology powering decentralised data storage and access',
  description: `
    Dive into the Arweave blockchain (the Blockweave) and see how it can be used to deploy decentralized web applications
    and data assets that are accessible forever. Once deployed on Arweave, web content and data requires zero recurring costs or
    maintenance to store and access forever. In this session, you'll learn why this bleeding edge technology is set to become one
    of the indispensable tools of your Web2 & Web3 toolkits.
  `,
  location: 'Herzogenaurach, Germany',
  locationLink: 'https://en.wikipedia.org/wiki/Herzogenaurach',
};

export const PRESENTATION_ID = 'ae7f2b';

export function PresentationProfile() {
  const { comments, updateComments } = usePresentationComments(PRESENTATION_ID);
  const { addUpvote, upvoteData } = useUpvotes(PRESENTATION_ID);
  const { isWalletConnected, connectWallet } = useWallet();

  function handleAddUpvote() {
    if (!isWalletConnected) {
      connectWallet();
    } else {
      addUpvote();
    }
  }

  return (
    <div className="lg:p-16">
      <div className={`h-32 rounded-t-2xl overflow-hidden flex bg-black`}>
        {presentationProfileData.headerBg && (
          <img src={presentationProfileData.headerBg} alt="header background" className="opacity-75 -mt-20 w-[100%] object-cover object-center" />
        )}
      </div>
      <div className="p-8 bg-white shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="grid grid-cols-2 text-center order-last md:order-first mt-20 md:mt-0">
            <div>
              <p className="font-bold text-gray-700 text-xl">{upvoteData.length}</p>
              <p className="text-gray-400">Upvotes</p>
            </div>
            <div>
              <p className="font-bold text-gray-700 text-xl">{comments.length}</p>
              <p className="text-gray-400">Comments</p>
            </div>
          </div>
          <div className="relative">
            <ProfileIcon avatarUrl={presentationProfileData.avatar} />
          </div>

          <div className="space-x-8 flex mt-48 md:mt-0 md:mt-0 justify-center md:justify-end">
            <button
              className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              onClick={() => handleAddUpvote()}
            >
              {!isWalletConnected && (
                <div className="flex flex-row">
                  <span className="ml-2">Connect Wallet</span>
                </div>
              )}

              {isWalletConnected && (
                <div className="flex flex-row">
                  <Thumb selected={true} />
                  <span className="ml-2">Upvote</span>
                </div>
              )}
            </button>
          </div>
        </div>
        <div className="mt-20 text-center border-b pb-12">
          <h1 className="text-4xl font-medium text-gray-700">{presentationProfileData.title}</h1>
          {presentationProfileData.subtitle && <h3 className="font-medium text-gray-600 mt-3 mb-8">{presentationProfileData.subtitle}</h3>}
          {presentationProfileData.location && (
            <p className="font-light text-gray-600 mt-3">
              {presentationProfileData.locationLink && (
                <a href={presentationProfileData.locationLink} target="_blank">
                  {presentationProfileData.location}
                </a>
              )}

              {!presentationProfileData.locationLink && presentationProfileData.location}
            </p>
          )}

          {presentationProfileData.presenter && (
            <>
              <p className="mt-8 text-gray-500">presented by</p>
              <p className="mt-2 text-gray-500">{presentationProfileData.presenter}</p>
            </>
          )}
        </div>

        <div className="mt-12 flex flex-col justify-center">
          <p className="text-gray-600 text-center font-light lg:px-16">{presentationProfileData.description}</p>
          {/*<button className="text-indigo-500 py-2 px-4  font-medium mt-4">Show more</button>*/}
        </div>

        <div className="mt-24">
          <Links />
        </div>
      </div>

      <div className="mt-12">
        <Comments comments={comments} onCommentAdded={() => updateComments()} />
      </div>

      <div className="mb-24 text-center">
        <div>
          Need $AR? Get some at{' '}
          <a href="https://faucet.arweave.net" target="_blank" className="underline">
            faucet.arweave.net
          </a>
        </div>
      </div>
    </div>
  );
}
