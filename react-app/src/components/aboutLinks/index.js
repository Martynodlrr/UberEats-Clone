import { AiFillGithub, AiOutlineSlack } from 'react-icons/ai';
import './index.css'

export default function AboutLinks() {
  const githubLinks = [
    'https://github.com/amorrow616',
    'https://github.com/DudeWithOneLeg',
    'https://github.com/hunter12756',
    'https://github.com/Martynodlrr'
  ];

  const pfp = [
    'https://ubereats-clone.s3.us-east-1.amazonaws.com/a.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLWVhc3QtMiJHMEUCIE6luIX%2Fnz6HWCY9d%2FCuhHvYt3Xg5FH2z2rz0%2B6cZpGWAiEAjt6svZrFbzdoVV7tJRNfNyVOgrJrk46ao1QgCBHiRxwq5AIINxAAGgw0NTUzMjQyMjU4NTUiDGPzYBSXGRdD5kkvsCrBAhIYt22a0eWH05RSsCYNNxjPhNKWtD15B7%2Bq1MjBnB5HYW6J1J2DvZkb9Ap77M4CUQSWsCoioQunaX26TIm%2BA83XMQcGTzOrydHkeDCDTl%2Fk5PjC0ATwsyIlfzHfhHMj1qhKQ51SUg0K6KnrbUqJovSejBkS7qU6nDfpI2DGecRsmuNR0237aNWY3H%2BYH6BeuxKcjfiQv%2FmKFEOn3ErJQGNwb7vSY9qvPTx1yfeSVdvBTiAU8RntU8M46%2BM%2B3NWfBgNe%2F1Nfd%2BTTnDyfBVLVsO6NxD6iBZx%2BzNygDw6WjXT7WYY0%2B4pkRmeal5H1Q%2FhWTT8uEG8Xz0Wp7K8snamgg8qhoSNlZ4KC%2FBBuBUaj654J12sadCbnEfohxLC1hbGRf5pMQLLufs%2FCv%2F7k7YXvv5o0k%2Fmig6xOQkWXf6YQ8M1uUjC6gNSnBjqzAmCm5zLTnyQ7gDTFF5ALEejfRgpNaNXRWp6IbucnT2SXw7tXp1SiSHR%2B05c7TyfjlYBDiB4h8zIHS5RBCRm0sLkUrG6Y6TjfLE99QfjWVIfWaWKNSkmXch49qalouXAp7LFfAPBhnVXqsPALvQfq280U1wURSVNXq2Ii%2FuhK%2BoJhNpIvtJaDm64YJpp2Ctbi2%2Bb3r5r%2BzN9hGM69OqzciW1UeMdv0EAb7pVkEzq9mcjHy61BVtNUmPDqW3AkoQ2%2F01HlJWlO%2FPd5SOSfpugNY1kJp0V9UHe7ShS1%2Fljx0hxedLMPKO6VbWpEEeWhCutwpNKwROQj6q%2B4YStR7RUpKrl%2B0HFxIa4CIdrU9yCXeLSoIOfgfDasw7ISBq2qk1t2yGzvGz3JXh5ewKrKV4mVLoM2pBc%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230903T220317Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAWUA3QKE7Z2GFGBQY%2F20230903%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=502ae2a63d7774d6dfb3b6e6d23a1de8a2a47c553518858b04e7105dd154f54d',
    'https://ubereats-clone.s3.us-east-1.amazonaws.com/r.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLWVhc3QtMiJHMEUCIE6luIX%2Fnz6HWCY9d%2FCuhHvYt3Xg5FH2z2rz0%2B6cZpGWAiEAjt6svZrFbzdoVV7tJRNfNyVOgrJrk46ao1QgCBHiRxwq5AIINxAAGgw0NTUzMjQyMjU4NTUiDGPzYBSXGRdD5kkvsCrBAhIYt22a0eWH05RSsCYNNxjPhNKWtD15B7%2Bq1MjBnB5HYW6J1J2DvZkb9Ap77M4CUQSWsCoioQunaX26TIm%2BA83XMQcGTzOrydHkeDCDTl%2Fk5PjC0ATwsyIlfzHfhHMj1qhKQ51SUg0K6KnrbUqJovSejBkS7qU6nDfpI2DGecRsmuNR0237aNWY3H%2BYH6BeuxKcjfiQv%2FmKFEOn3ErJQGNwb7vSY9qvPTx1yfeSVdvBTiAU8RntU8M46%2BM%2B3NWfBgNe%2F1Nfd%2BTTnDyfBVLVsO6NxD6iBZx%2BzNygDw6WjXT7WYY0%2B4pkRmeal5H1Q%2FhWTT8uEG8Xz0Wp7K8snamgg8qhoSNlZ4KC%2FBBuBUaj654J12sadCbnEfohxLC1hbGRf5pMQLLufs%2FCv%2F7k7YXvv5o0k%2Fmig6xOQkWXf6YQ8M1uUjC6gNSnBjqzAmCm5zLTnyQ7gDTFF5ALEejfRgpNaNXRWp6IbucnT2SXw7tXp1SiSHR%2B05c7TyfjlYBDiB4h8zIHS5RBCRm0sLkUrG6Y6TjfLE99QfjWVIfWaWKNSkmXch49qalouXAp7LFfAPBhnVXqsPALvQfq280U1wURSVNXq2Ii%2FuhK%2BoJhNpIvtJaDm64YJpp2Ctbi2%2Bb3r5r%2BzN9hGM69OqzciW1UeMdv0EAb7pVkEzq9mcjHy61BVtNUmPDqW3AkoQ2%2F01HlJWlO%2FPd5SOSfpugNY1kJp0V9UHe7ShS1%2Fljx0hxedLMPKO6VbWpEEeWhCutwpNKwROQj6q%2B4YStR7RUpKrl%2B0HFxIa4CIdrU9yCXeLSoIOfgfDasw7ISBq2qk1t2yGzvGz3JXh5ewKrKV4mVLoM2pBc%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230903T220352Z&X-Amz-SignedHeaders=host&X-Amz-Expires=299&X-Amz-Credential=ASIAWUA3QKE7Z2GFGBQY%2F20230903%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=c76deaa6e506f70bdf29ee6e9888891ccf72a8a9f46a475be194b7b1f232e6c1',
    'https://ubereats-clone.s3.us-east-1.amazonaws.com/h.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLWVhc3QtMiJHMEUCIE6luIX%2Fnz6HWCY9d%2FCuhHvYt3Xg5FH2z2rz0%2B6cZpGWAiEAjt6svZrFbzdoVV7tJRNfNyVOgrJrk46ao1QgCBHiRxwq5AIINxAAGgw0NTUzMjQyMjU4NTUiDGPzYBSXGRdD5kkvsCrBAhIYt22a0eWH05RSsCYNNxjPhNKWtD15B7%2Bq1MjBnB5HYW6J1J2DvZkb9Ap77M4CUQSWsCoioQunaX26TIm%2BA83XMQcGTzOrydHkeDCDTl%2Fk5PjC0ATwsyIlfzHfhHMj1qhKQ51SUg0K6KnrbUqJovSejBkS7qU6nDfpI2DGecRsmuNR0237aNWY3H%2BYH6BeuxKcjfiQv%2FmKFEOn3ErJQGNwb7vSY9qvPTx1yfeSVdvBTiAU8RntU8M46%2BM%2B3NWfBgNe%2F1Nfd%2BTTnDyfBVLVsO6NxD6iBZx%2BzNygDw6WjXT7WYY0%2B4pkRmeal5H1Q%2FhWTT8uEG8Xz0Wp7K8snamgg8qhoSNlZ4KC%2FBBuBUaj654J12sadCbnEfohxLC1hbGRf5pMQLLufs%2FCv%2F7k7YXvv5o0k%2Fmig6xOQkWXf6YQ8M1uUjC6gNSnBjqzAmCm5zLTnyQ7gDTFF5ALEejfRgpNaNXRWp6IbucnT2SXw7tXp1SiSHR%2B05c7TyfjlYBDiB4h8zIHS5RBCRm0sLkUrG6Y6TjfLE99QfjWVIfWaWKNSkmXch49qalouXAp7LFfAPBhnVXqsPALvQfq280U1wURSVNXq2Ii%2FuhK%2BoJhNpIvtJaDm64YJpp2Ctbi2%2Bb3r5r%2BzN9hGM69OqzciW1UeMdv0EAb7pVkEzq9mcjHy61BVtNUmPDqW3AkoQ2%2F01HlJWlO%2FPd5SOSfpugNY1kJp0V9UHe7ShS1%2Fljx0hxedLMPKO6VbWpEEeWhCutwpNKwROQj6q%2B4YStR7RUpKrl%2B0HFxIa4CIdrU9yCXeLSoIOfgfDasw7ISBq2qk1t2yGzvGz3JXh5ewKrKV4mVLoM2pBc%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230903T220405Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAWUA3QKE7Z2GFGBQY%2F20230903%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=6d7c52dc416281b9a3a49d242e0159464c27a9c9f1974b2c92b0cb5b31bca43d',
    'https://ubereats-clone.s3.us-east-1.amazonaws.com/m.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLWVhc3QtMiJHMEUCIE6luIX%2Fnz6HWCY9d%2FCuhHvYt3Xg5FH2z2rz0%2B6cZpGWAiEAjt6svZrFbzdoVV7tJRNfNyVOgrJrk46ao1QgCBHiRxwq5AIINxAAGgw0NTUzMjQyMjU4NTUiDGPzYBSXGRdD5kkvsCrBAhIYt22a0eWH05RSsCYNNxjPhNKWtD15B7%2Bq1MjBnB5HYW6J1J2DvZkb9Ap77M4CUQSWsCoioQunaX26TIm%2BA83XMQcGTzOrydHkeDCDTl%2Fk5PjC0ATwsyIlfzHfhHMj1qhKQ51SUg0K6KnrbUqJovSejBkS7qU6nDfpI2DGecRsmuNR0237aNWY3H%2BYH6BeuxKcjfiQv%2FmKFEOn3ErJQGNwb7vSY9qvPTx1yfeSVdvBTiAU8RntU8M46%2BM%2B3NWfBgNe%2F1Nfd%2BTTnDyfBVLVsO6NxD6iBZx%2BzNygDw6WjXT7WYY0%2B4pkRmeal5H1Q%2FhWTT8uEG8Xz0Wp7K8snamgg8qhoSNlZ4KC%2FBBuBUaj654J12sadCbnEfohxLC1hbGRf5pMQLLufs%2FCv%2F7k7YXvv5o0k%2Fmig6xOQkWXf6YQ8M1uUjC6gNSnBjqzAmCm5zLTnyQ7gDTFF5ALEejfRgpNaNXRWp6IbucnT2SXw7tXp1SiSHR%2B05c7TyfjlYBDiB4h8zIHS5RBCRm0sLkUrG6Y6TjfLE99QfjWVIfWaWKNSkmXch49qalouXAp7LFfAPBhnVXqsPALvQfq280U1wURSVNXq2Ii%2FuhK%2BoJhNpIvtJaDm64YJpp2Ctbi2%2Bb3r5r%2BzN9hGM69OqzciW1UeMdv0EAb7pVkEzq9mcjHy61BVtNUmPDqW3AkoQ2%2F01HlJWlO%2FPd5SOSfpugNY1kJp0V9UHe7ShS1%2Fljx0hxedLMPKO6VbWpEEeWhCutwpNKwROQj6q%2B4YStR7RUpKrl%2B0HFxIa4CIdrU9yCXeLSoIOfgfDasw7ISBq2qk1t2yGzvGz3JXh5ewKrKV4mVLoM2pBc%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230903T220421Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAWUA3QKE7Z2GFGBQY%2F20230903%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=8dff9a4e08980e9f6f54478258392479b3fedb8800529d378d39e3e98135af28'
  ];

  const slackLinks = [
    'https://app-academy.slack.com/team/U04JP231GUW',
    'https://app-academy.slack.com/team/U04G4GM5CVB',
    'https://app-academy.slack.com/team/U04KJHDQG6S',
    'https://app-academy.slack.com/team/U04QT1JR9D4'
  ];

  return (
    <>
      <h1 id='title'>Authors: </h1>
      <div id='about-links'>
        {githubLinks.map((link, index) => (
          <div key={index} className='link-item'>
            <img src={pfp[index]} alt="Profile" className="profile-picture" />
            <a href={link} target="_blank" rel="noreferrer">
              <AiFillGithub size={24} />
            </a>
            <a href={slackLinks[index]} target="_blank" rel="noreferrer">
              <AiOutlineSlack size={24} />
            </a>
          </div>
        ))}
      </div>
    </>
  )
}
