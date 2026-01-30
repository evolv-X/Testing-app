import { useRef, useState } from "react";
import styled from "@emotion/styled";
import { SearchIcon } from "../../icons/icons";
import { Link } from "react-router-dom";

const SearchSlot = styled.div`
  display: flex;
  align-items: center;
  width: 220px; /* min-width инпута */
  justify-content: flex-end;
`;

const SearchButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 20px;
  color: #475569;
  padding: 6px;
  border-radius: 8px;
  transition: background 0.2s ease;

  &:hover {
    background: #f5f7fb;
  }
`;

const SearchInput = styled.input`
  height: 36px;
  min-width: 220px;
  padding: 0 10px;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  outline: none;
  font-size: 14px;
  color: #0f172a;
  background: #fff;

  &:focus {
    border-color: #0e73f6;
    box-shadow: 0 0 0 3px rgba(14, 115, 246, 0.15);
  }
`;

export function StudentTest() {
  const [searchOpen, setSearchOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const closeSearch = () => setSearchOpen(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.currentTarget.blur();
      closeSearch();
    }
  };

  const students = [
    {
      id: 0,
      name: "Python",
    },
    {
      id: 1,
      name: "js",
    },
    {
      id: 1,
      name: "Go",
    },
  ];

  return (
    <div>
      <SearchSlot>
        {!searchOpen ? (
          <SearchButton
            type="button"
            title="Открыть поиск"
            onClick={() => setSearchOpen(true)}
          >
            <SearchIcon />
          </SearchButton>
        ) : (
          <SearchInput
            ref={inputRef}
            autoFocus
            placeholder="Поиск тестов…"
            onBlur={closeSearch}
            onKeyDown={handleKeyDown}
          />
        )}
      </SearchSlot>
      <ul>
        {students.map((s) => (
          <li key={s.id}>
            <Link to={`/student/test/${s.id}`}>{s.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
