

const data = [
  {
    title: 'Transmission',
    url: 'http://dash.agussarwono.com/bajakan/web/',
    name: 'magnet',
  },
  {
    title: 'Directories',
    url: 'https://drive.agussarwono.com',
    name: 'folder'
  },
  {
    title: 'ayunovanti.com admin',
    url: 'http://nulis.ayunovanti.com/wp-admin',
    name: 'article'
  },
  {
    title: 'Cloudflare',
    url: "https://dash.cloudflare.com/a64d5284b8df3720dadafc315a46eb4e",
    name: 'globe'
  },
  {
    title: 'Mikrotik',
    url: 'https://192.168.10.1',
    name: 'wifi-high'
  }
];
export default function Home() {
  return (
    <div className="p-6 mx-auto flex">
      {data.map((i, k) => (
        <div key={k} className="group w-1/12 cursor-pointer text-white p-5 rounded-xl border-red-100 border m-2 hover:border-dashed">
          <a href={i.url} target="_blank">
            <div className="flex items-center flex-col">
              <div className="p-2 group-hover:scale-150 transition-all">
                <i className={`ph ph-${i.name}`}></i>
              </div>
              <span className="text-center text-sm">
                {i.title}
              </span>
            </div>
          </a>
          </div>
      ))}
    </div>
  );
}
