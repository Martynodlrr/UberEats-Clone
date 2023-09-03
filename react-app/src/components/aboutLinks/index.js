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
    'https://ubereats-clone.s3.us-east-1.amazonaws.com/a.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLWVhc3QtMiJHMEUCIE6luIX%2Fnz6HWCY9d%2FCuhHvYt3Xg5FH2z2rz0%2B6cZpGWAiEAjt6svZrFbzdoVV7tJRNfNyVOgrJrk46ao1QgCBHiRxwq5AIINxAAGgw0NTUzMjQyMjU4NTUiDGPzYBSXGRdD5kkvsCrBAhIYt22a0eWH05RSsCYNNxjPhNKWtD15B7%2Bq1MjBnB5HYW6J1J2DvZkb9Ap77M4CUQSWsCoioQunaX26TIm%2BA83XMQcGTzOrydHkeDCDTl%2Fk5PjC0ATwsyIlfzHfhHMj1qhKQ51SUg0K6KnrbUqJovSejBkS7qU6nDfpI2DGecRsmuNR0237aNWY3H%2BYH6BeuxKcjfiQv%2FmKFEOn3ErJQGNwb7vSY9qvPTx1yfeSVdvBTiAU8RntU8M46%2BM%2B3NWfBgNe%2F1Nfd%2BTTnDyfBVLVsO6NxD6iBZx%2BzNygDw6WjXT7WYY0%2B4pkRmeal5H1Q%2FhWTT8uEG8Xz0Wp7K8snamgg8qhoSNlZ4KC%2FBBuBUaj654J12sadCbnEfohxLC1hbGRf5pMQLLufs%2FCv%2F7k7YXvv5o0k%2Fmig6xOQkWXf6YQ8M1uUjC6gNSnBjqzAmCm5zLTnyQ7gDTFF5ALEejfRgpNaNXRWp6IbucnT2SXw7tXp1SiSHR%2B05c7TyfjlYBDiB4h8zIHS5RBCRm0sLkUrG6Y6TjfLE99QfjWVIfWaWKNSkmXch49qalouXAp7LFfAPBhnVXqsPALvQfq280U1wURSVNXq2Ii%2FuhK%2BoJhNpIvtJaDm64YJpp2Ctbi2%2Bb3r5r%2BzN9hGM69OqzciW1UeMdv0EAb7pVkEzq9mcjHy61BVtNUmPDqW3AkoQ2%2F01HlJWlO%2FPd5SOSfpugNY1kJp0V9UHe7ShS1%2Fljx0hxedLMPKO6VbWpEEeWhCutwpNKwROQj6q%2B4YStR7RUpKrl%2B0HFxIa4CIdrU9yCXeLSoIOfgfDasw7ISBq2qk1t2yGzvGz3JXh5ewKrKV4mVLoM2pBc%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230903T215436Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAWUA3QKE7Z2GFGBQY%2F20230903%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=6c663df97c82918fe282e44e68459e1a0f720224f9d06b16e7bb31d319355539',
    'https://ubereats-clone.s3.us-east-1.amazonaws.com/r.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLWVhc3QtMiJHMEUCIE6luIX%2Fnz6HWCY9d%2FCuhHvYt3Xg5FH2z2rz0%2B6cZpGWAiEAjt6svZrFbzdoVV7tJRNfNyVOgrJrk46ao1QgCBHiRxwq5AIINxAAGgw0NTUzMjQyMjU4NTUiDGPzYBSXGRdD5kkvsCrBAhIYt22a0eWH05RSsCYNNxjPhNKWtD15B7%2Bq1MjBnB5HYW6J1J2DvZkb9Ap77M4CUQSWsCoioQunaX26TIm%2BA83XMQcGTzOrydHkeDCDTl%2Fk5PjC0ATwsyIlfzHfhHMj1qhKQ51SUg0K6KnrbUqJovSejBkS7qU6nDfpI2DGecRsmuNR0237aNWY3H%2BYH6BeuxKcjfiQv%2FmKFEOn3ErJQGNwb7vSY9qvPTx1yfeSVdvBTiAU8RntU8M46%2BM%2B3NWfBgNe%2F1Nfd%2BTTnDyfBVLVsO6NxD6iBZx%2BzNygDw6WjXT7WYY0%2B4pkRmeal5H1Q%2FhWTT8uEG8Xz0Wp7K8snamgg8qhoSNlZ4KC%2FBBuBUaj654J12sadCbnEfohxLC1hbGRf5pMQLLufs%2FCv%2F7k7YXvv5o0k%2Fmig6xOQkWXf6YQ8M1uUjC6gNSnBjqzAmCm5zLTnyQ7gDTFF5ALEejfRgpNaNXRWp6IbucnT2SXw7tXp1SiSHR%2B05c7TyfjlYBDiB4h8zIHS5RBCRm0sLkUrG6Y6TjfLE99QfjWVIfWaWKNSkmXch49qalouXAp7LFfAPBhnVXqsPALvQfq280U1wURSVNXq2Ii%2FuhK%2BoJhNpIvtJaDm64YJpp2Ctbi2%2Bb3r5r%2BzN9hGM69OqzciW1UeMdv0EAb7pVkEzq9mcjHy61BVtNUmPDqW3AkoQ2%2F01HlJWlO%2FPd5SOSfpugNY1kJp0V9UHe7ShS1%2Fljx0hxedLMPKO6VbWpEEeWhCutwpNKwROQj6q%2B4YStR7RUpKrl%2B0HFxIa4CIdrU9yCXeLSoIOfgfDasw7ISBq2qk1t2yGzvGz3JXh5ewKrKV4mVLoM2pBc%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230903T215444Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAWUA3QKE7Z2GFGBQY%2F20230903%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=54666ce84e971e9f29f2a3a019c17a290b810647b91245d066106b755570f7e1',
    'https://ubereats-clone.s3.us-east-1.amazonaws.com/h.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLWVhc3QtMiJHMEUCIE6luIX%2Fnz6HWCY9d%2FCuhHvYt3Xg5FH2z2rz0%2B6cZpGWAiEAjt6svZrFbzdoVV7tJRNfNyVOgrJrk46ao1QgCBHiRxwq5AIINxAAGgw0NTUzMjQyMjU4NTUiDGPzYBSXGRdD5kkvsCrBAhIYt22a0eWH05RSsCYNNxjPhNKWtD15B7%2Bq1MjBnB5HYW6J1J2DvZkb9Ap77M4CUQSWsCoioQunaX26TIm%2BA83XMQcGTzOrydHkeDCDTl%2Fk5PjC0ATwsyIlfzHfhHMj1qhKQ51SUg0K6KnrbUqJovSejBkS7qU6nDfpI2DGecRsmuNR0237aNWY3H%2BYH6BeuxKcjfiQv%2FmKFEOn3ErJQGNwb7vSY9qvPTx1yfeSVdvBTiAU8RntU8M46%2BM%2B3NWfBgNe%2F1Nfd%2BTTnDyfBVLVsO6NxD6iBZx%2BzNygDw6WjXT7WYY0%2B4pkRmeal5H1Q%2FhWTT8uEG8Xz0Wp7K8snamgg8qhoSNlZ4KC%2FBBuBUaj654J12sadCbnEfohxLC1hbGRf5pMQLLufs%2FCv%2F7k7YXvv5o0k%2Fmig6xOQkWXf6YQ8M1uUjC6gNSnBjqzAmCm5zLTnyQ7gDTFF5ALEejfRgpNaNXRWp6IbucnT2SXw7tXp1SiSHR%2B05c7TyfjlYBDiB4h8zIHS5RBCRm0sLkUrG6Y6TjfLE99QfjWVIfWaWKNSkmXch49qalouXAp7LFfAPBhnVXqsPALvQfq280U1wURSVNXq2Ii%2FuhK%2BoJhNpIvtJaDm64YJpp2Ctbi2%2Bb3r5r%2BzN9hGM69OqzciW1UeMdv0EAb7pVkEzq9mcjHy61BVtNUmPDqW3AkoQ2%2F01HlJWlO%2FPd5SOSfpugNY1kJp0V9UHe7ShS1%2Fljx0hxedLMPKO6VbWpEEeWhCutwpNKwROQj6q%2B4YStR7RUpKrl%2B0HFxIa4CIdrU9yCXeLSoIOfgfDasw7ISBq2qk1t2yGzvGz3JXh5ewKrKV4mVLoM2pBc%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230903T215430Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAWUA3QKE7Z2GFGBQY%2F20230903%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=bdd288e0c1c3d04d69e8770bf0f3390126ee6ab39eb544ffbff1497f4f626e25',
    'https://ubereats-clone.s3.us-east-1.amazonaws.com/m.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLWVhc3QtMiJHMEUCIE6luIX%2Fnz6HWCY9d%2FCuhHvYt3Xg5FH2z2rz0%2B6cZpGWAiEAjt6svZrFbzdoVV7tJRNfNyVOgrJrk46ao1QgCBHiRxwq5AIINxAAGgw0NTUzMjQyMjU4NTUiDGPzYBSXGRdD5kkvsCrBAhIYt22a0eWH05RSsCYNNxjPhNKWtD15B7%2Bq1MjBnB5HYW6J1J2DvZkb9Ap77M4CUQSWsCoioQunaX26TIm%2BA83XMQcGTzOrydHkeDCDTl%2Fk5PjC0ATwsyIlfzHfhHMj1qhKQ51SUg0K6KnrbUqJovSejBkS7qU6nDfpI2DGecRsmuNR0237aNWY3H%2BYH6BeuxKcjfiQv%2FmKFEOn3ErJQGNwb7vSY9qvPTx1yfeSVdvBTiAU8RntU8M46%2BM%2B3NWfBgNe%2F1Nfd%2BTTnDyfBVLVsO6NxD6iBZx%2BzNygDw6WjXT7WYY0%2B4pkRmeal5H1Q%2FhWTT8uEG8Xz0Wp7K8snamgg8qhoSNlZ4KC%2FBBuBUaj654J12sadCbnEfohxLC1hbGRf5pMQLLufs%2FCv%2F7k7YXvv5o0k%2Fmig6xOQkWXf6YQ8M1uUjC6gNSnBjqzAmCm5zLTnyQ7gDTFF5ALEejfRgpNaNXRWp6IbucnT2SXw7tXp1SiSHR%2B05c7TyfjlYBDiB4h8zIHS5RBCRm0sLkUrG6Y6TjfLE99QfjWVIfWaWKNSkmXch49qalouXAp7LFfAPBhnVXqsPALvQfq280U1wURSVNXq2Ii%2FuhK%2BoJhNpIvtJaDm64YJpp2Ctbi2%2Bb3r5r%2BzN9hGM69OqzciW1UeMdv0EAb7pVkEzq9mcjHy61BVtNUmPDqW3AkoQ2%2F01HlJWlO%2FPd5SOSfpugNY1kJp0V9UHe7ShS1%2Fljx0hxedLMPKO6VbWpEEeWhCutwpNKwROQj6q%2B4YStR7RUpKrl%2B0HFxIa4CIdrU9yCXeLSoIOfgfDasw7ISBq2qk1t2yGzvGz3JXh5ewKrKV4mVLoM2pBc%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230903T215440Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAWUA3QKE7Z2GFGBQY%2F20230903%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=93551d47fe5edfb42294d12981c74ce8e7c595ac90bba8e621f0f1a2056aa552'
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
