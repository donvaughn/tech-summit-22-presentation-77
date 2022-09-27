export function Links() {
  const links: [string, string[]][] = [
    ['Arweave Faucet', ['faucet.arweave.net']],
    ['Presentation App', ['github.com/donvaughn/tech-summit-22-presentation-77']],
    ['Arweave Kitchen Sink', ['github.com/donvaughn/arweave-kitchen-sink']],
    ['Official Site', ['www.arweave.org']],
    ['Documentation', ['docs.arweave.org/developers']],
    ['Wiki', ['arwiki.wiki']],
    ['Block Explorer', ['viewblock.io/arweave', 'v2.viewblock.io/arweave']],
  ];

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 bg-gray-100">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Links</h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          {links.map((link, index) => (
            <div key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
              <dt className="text-sm font-bold text-gray-500 flex items-center">{link[0]}</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {link[1].map((url: string, index) => (
                  <div key={index} className={`${index && 'mt-2'} hover:underline`}>
                    <a href={`https://${url}`}>{url}</a>
                  </div>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
