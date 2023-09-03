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
    'https://ubereats-clone.s3.amazonaws.com/517b1cade4274b06bf5073c49b5994ce.png',
    'https://ubereats-clone.s3.amazonaws.com/c3dd26d6730e415e9805e0ca6b923c26.png',
    'https://ubereats-clone.s3.amazonaws.com/d791caca54574fccabc194f09a3c8641.png',
    'https://ubereats-clone.s3.amazonaws.com/7f4e6c5f59ff47d0b501d0c32216b3d9.png'
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
