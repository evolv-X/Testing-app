import styled from "@emotion/styled";
import { useState } from "react";
import ChangeModalPass from "./ChangeModalPass";
import { Toast } from "./ui/Toast";

type GroupLearning = { group: string; course: string; direction: string };

type ProfileData = {
  fullName: string;
  achivment: string;
  avatarUrl: string;
  social: {
    url: string;
    label: string;
  };
  learning: GroupLearning[];
};

const ProfileWrapper = styled.div`
  display: flex;
  gap: 24px;
  padding: 24px;

  background: ${(p) => p.theme.colors.background};
  border-radius: ${(p) => p.theme.radius.lg};
`;

const Avatar = styled.img`
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: ${(p) => p.theme.radius.lg};
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Name = styled.h2`
  margin: 0;
  color: ${(p) => p.theme.colors.text};
`;

const Badge = styled.span`
  padding: 4px 12px;
  background: #e8f5ff;
  color: #4094f7;
  border-radius: ${(p) => p.theme.radius.md};
  font-size: 14px;
`;

const Social = styled.div`
  color: ${(p) => p.theme.colors.text};
  font-size: 14px;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  padding: 6px 10px;
  background: ${(p) => p.theme.colors.background};
  border-radius: ${(p) => p.theme.radius.sm};
  font-size: 13px;
  color: ${(p) => p.theme.colors.text};
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`;

const Button = styled.button`
  padding: 10px 16px;
  border-radius: ${(p) => p.theme.radius.md};
  border: 1px solid #dde2e4;
  background: transparent;
  color: ${(p) => p.theme.colors.text};
  cursor: pointer;

  &:hover {
    background: #e8f5ff;
    color: #4094f7;
    border: 1px solid #4094f7;
  }
`;

const emptyAvatar =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fac%2F3b%2F7c%2Fac3b7cd63b5066f78547ae57fd324987.jpg";

export function StudentProfilePage() {
  const userData = {
    fullName: "Иванов Арсений Юрьевич",
    achivment: "КОД",
    avatarUrl:
      "https://data.chpic.su/stickers/p/Ptichkisinichki_by_TgEmodziBot/Ptichkisinichki_by_TgEmodziBot_001.webp",

    social: {
      url: "https://vk.com/id620338668",

      label: "vk.com/id620338668",
    },
    learning: [{ group: "КФ3", course: "3 курс", direction: "Frontend" }],
  };

  const [profile, setProfile] = useState<ProfileData>(userData);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenToast, setIsOpenToast] = useState(false);

  function handleChangePass() {
    console.log("click chng pass");
    setIsOpenModal(true);
  }

  return (
    <ProfileWrapper>
      <Avatar
        src={userData.avatarUrl || emptyAvatar}
        alt={userData.fullName || "anon"}
      />

      <Info>
        <Header>
          <Name>{userData.fullName}</Name>
          {userData.achivment && <Badge>{userData.achivment}</Badge>}
        </Header>

        {userData.social?.label && <Social>{userData.social.label}</Social>}

        <Tags>
          {userData.learning.map((s, ind) => (
            <Tag key={ind}>
              {s.group} · {s.course} курс · {s.direction}
            </Tag>
          ))}
        </Tags>

        <Actions>
          <Button>Поменять фото</Button>
          <Button onClick={() => handleChangePass()}>Изменить пароль</Button>
        </Actions>
      </Info>
      <ChangeModalPass
        open={isOpenModal}
        onClose={(v) => setIsOpenModal(v)}
        onSuccess={() => setIsOpenToast(true)}
      />
      <Toast
        open={isOpenToast}
        message="sucksess"
        type="info"
        onClose={() => setIsOpenToast(false)}
      ></Toast>
    </ProfileWrapper>
  );
}
