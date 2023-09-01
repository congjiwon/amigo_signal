# Amigo signal

여행 동행 찾기 및 전세계 핫스팟 리뷰 공유✨

## 프로젝트 소개

혼여행 하는 사람들이 많아지면서 본인 니즈에 맞는 동행을 쉽고 편리하게 찾을 수 있는 서비스를 제공

![동행찿기](https://github.com/congjiwon/amigo_signal/assets/124796418/d180623b-74df-441e-9e27-de2da638476a)

## 목차

[1. 팀 구성](#팀원)

[2. 프로젝트 노션](#프로젝트-노션)

[3. 기술 스택](#기술-스택-및-라이브러리)

[4. 페이지 구성](#페이지-구성)

[5. 깃플로우 전략](#깃플로우-전략)

[6. 커밋 컨벤션](#커밋-컨벤션)

[7. 코드 컨벤션](#코드-컨벤션)

## 팀원

| 팀원   | 스택         | 역할       | 깃허브                                      |
| ------ | ------------ | ---------- | ------------------------------------------- |
| 양지원 | `프론트엔드` | `팀장`     | [congjiwon](https://github.com/congjiwon)   |
| 김수연 | `피그마`     | `디자이너` | [????]()                                    |
| 임설빈 | `프론트엔드` | 부팀장     | [been7](https://github.com/been7)           |
| 박희연 | `프론트엔드` | 팀원       | [heeyeon park](https://github.com/hi-react) |
| 임지영 | `프론트엔드` | 팀원       | [jiapril11](https://github.com/jiapril11)   |
| 송현섭 | `프론트엔드` | 팀원       | [songhsb](https://github.com/songhsb)       |

## 프로젝트 노션

[Amigo Signal Notion](https://www.notion.so/7-amigo-signal-8bfd66ca86fd4690944ac66c23403b90)

## 기술 스택 및 라이브러리

<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=black">
<img src="https://img.shields.io/badge/zustand-purple?style=for-the-badge&logo=zustand&logoColor=black">

<img src="https://img.shields.io/badge/supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=black"> <img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=black"> <br/>
<img src="https://img.shields.io/badge/quill-c8cfff?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5NDIgNTU5LjkiPg0KPGNpcmNsZSBjeD0iNzQ5IiBjeT0iMTI1LjUiIHI9IjI1LjciIGNsYXNzPSJsb2dvIj48L2NpcmNsZT4NCjxwYXRoIGQ9Ik02NDMuMyAyMTEuNWMwIDIxLjIgMCA3Ni41IDAgOTEuOCAwIDE5LjUtMy41IDkwLjktNzYuMSA5MC45LTc1LjkgMC03NC4zLTcxLjMtNzQuMy05OC44IDAtMjMuNCAwLTcwLjQgMC04My44aC0zOXY5NC4xcy04LjEgMTI4LjUgMTExLjMgMTI4LjVjMTE5LjQgMCAxMTUuNC0xMjQuNSAxMTUuNC0xMjQuNXYtOTguMmgtMzcuM3pNODE2LjUgNDUuMkg4NTV2Mzc4LjVoLTM4LjV6TTUwNCA0NzIuN2MtNzkuNCAwLTE5NC45LTEyLTI2OC4zLTEyLjgtMTIuMiAwLTIzIDEuNS0zMi42IDMuOWwxMy0xMS42YzE0LjMtMTIuOSAzNy42LTIwLjkgNDMuNC0yMiA5NC40LTE4LjYgMTY0LjgtOTMuNyAxNjQuOC0yMTIuOEM0MjQuMyA4My4yIDMyOS4zIDAgMjEyLjEgMFMwIDc2LjkgMCAyMTcuM2MwIDEyNi44IDg0LjkgMjA4IDE5My4xIDIxNi41IDAgMCA1LjcuMSA2LjQgMy42LjYgMy4xLTQuOCA3LjYtNC44IDcuNmwtNjQuNCA1OS42IDEyLjQgMTMuNCAyMy44LTIxLjNjMTMuMy0xMC42IDM1LjEtMjMuNiA2Mi4xLTIzLjYgODkuMyAwIDE4OC4yIDg5LjEgMjgwLjEgODYuOSAxMzQuNC0zLjIgMTY1LjctOTMgMTY5LjEtMTA0LjYuMi0uNC01NS42IDE3LjMtMTczLjggMTcuM3pNMzkuNCAyMTcuM2MwLTExNC4zIDc3LjMtMTc3IDE3Mi44LTE3NyA5NS40IDAgMTcyLjggNjcuNyAxNzIuOCAxNzcgMCAxMTIuNi03Ny4zIDE3Ny0xNzIuOCAxNzctOTUuNS0uMS0xNzIuOC02Ny44LTE3Mi44LTE3N3pNOTAzLjUgNDUuMkg5NDJ2Mzc4LjVoLTM4LjV6TTcyOS41IDIxMS4xSDc2OHYyMTIuNWgtMzguNXoiIGNsYXNzPSJsb2dvIj48L3BhdGg+DQo8L3N2Zz4=&logoColor=white"> <img src="https://img.shields.io/badge/googlemaps-4285F4?style=for-the-badge&logo=googlemaps&logoColor=black">

<img src="https://img.shields.io/badge/StyledComponents-DB7093?style=for-the-badge&logo=styled-components&logoColor=black"/>
<img src="https://img.shields.io/badge/antdesign-0170FE?style=for-the-badge&logo=antdesign&logoColor=black">  
  <img src="https://img.shields.io/badge/sweetalert2-91fa79?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjE1LjQgLTEyMC4zIDI2OS4zIDI2OS4zIj4NCiAgICAgICAgICAgICAgPHN0eWxlPg0KICAgICAgICAgICAgICAgIC5zdDQgew0KICAgICAgICAgICAgICAgICAgZmlsbDogI2ZhNzQ3MTsNCiAgICAgICAgICAgICAgICB9DQogICAgICAgICAgICAgICAgLnN0NSB7DQogICAgICAgICAgICAgICAgICBmaWxsOiAjYTU3NWI3Ow0KICAgICAgICAgICAgICAgIH0NCiAgICAgICAgICAgICAgICAuc3Q2IHsNCiAgICAgICAgICAgICAgICAgIHN0cm9rZS13aWR0aDogOC4yOw0KICAgICAgICAgICAgICAgICAgc3Ryb2tlOiAjOGEzZDliOw0KICAgICAgICAgICAgICAgICAgZmlsbDogbm9uZTsNCiAgICAgICAgICAgICAgICAgIHN0cm9rZS1taXRlcmxpbWl0OiAxMDsNCiAgICAgICAgICAgICAgICB9DQogICAgICAgICAgICAgICAgLnN0NyB7DQogICAgICAgICAgICAgICAgICBmaWxsOiAjOGEzZDliOw0KICAgICAgICAgICAgICAgIH0NCiAgICAgICAgICAgICAgPC9zdHlsZT4NCiAgICAgICAgICAgICAgPGNpcmNsZSBpZD0ibG93ZXJfY2lyY2xlIiBjeD0iMTYxLjgiIGN5PSIyNyIgcj0iMTAwLjIiIGZpbGw9IiNmZGNjODAiPjwvY2lyY2xlPg0KICAgICAgICAgICAgICA8Y2lyY2xlIGlkPSJpbm5lcl9jaXJjbGUiIGN4PSIxNDkuNCIgY3k9IjE0LjIiIHI9IjM2LjgiIGZpbGw9IiNmZmYiPjwvY2lyY2xlPg0KICAgICAgICAgICAgICA8cGF0aCBpZD0idXBwZXJfZnJvc3RpbmciIGQ9Ik0xMDguNyAxMDUuNWMtNi42LjMtMzEuOS0xMy40LTQyLjQtNDkuNS0xLjktNi42LTQuNS0xNi44LTQuNS0yOS42IDAtNTUgNDQuNi05OS42IDk5LjYtOTkuNiAxMy4xIDAgMjMuNSAyLjcgMjkuNiA0LjUgMzQuNCAxMC40IDQ4IDM0LjEgNDQuOSA0MC41cy0xMC42LTMuNC0yMi45LTIuNWMtMS40LjEtNC4yIDQtNC4yIDYuMiAwIDcuMiAxMy41IDEyLjcgMTQuNiAxNS45IDEuNyA1IDMuNCA2LjIgMi4zIDkuNS0xLjUgNC44LTIuOSAzLjYtNS4yIDUuOS0uOS45LTUuNi43LTE2LjYtMS43LTUuOS0xLjMtMTgtMTEuMi0xOC0xMS40IDAtLjQtMTYuMi0xMy4zLTMwLjItMTQuOC02LjYtLjctMjguMS0yLjgtMzkuMiAxOS4yLS41IDEuMS00LjQgMjAtNC4yIDIyLjUuOSAxMS45IDcgMjQuNyAxMi4xIDI3LjUgMTEuNyA2LjQgMTIuOSAxNC43IDEyLjggMTQuNC0uMS0uNCA3LjggMTQuNyA4LjIgMTcuMy4zIDIuMS0uOCA3LjQtMy43IDguNy0zLjUgMS41LTcuNy0xLjctOC40LTIuMS0uOC0uNS0xMC43LTE2LjMtMTkuNS0xMy4xLS44LjMtNiAzLjctNy42IDUtLjMuMiA0LjggMTUuNCA1LjYgMTguNS41IDEuOC0yLjMgOC43LTMuMSA4Ljd6IiBvcGFjaXR5PSIuNSIgZmlsbD0iI2ZhNzQ3MSI+PC9wYXRoPg0KICAgICAgICAgICAgICA8ZyBpZD0ic3ByaW5rbGVzIj4NCiAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNMTM1LjEtNjkuM2gtLjJjLTIuMy40LTMuOCAyLjYtMy40IDQuOS40IDIuMyAyLjYgMy44IDQuOSAzLjQuOC0uMSAxLjUtLjUgMi4xLTEgMS0uOSAxLjYtMi4zIDEuNC0zLjctLjMtMi4zLTIuNS0zLjktNC44LTMuNnoiPjwvcGF0aD4NCiAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNMTgxLjctNjVjLTIuMy0uMS00LjMgMS43LTQuNSA0bC0uNSA4LjRjLS4xIDIuMyAxLjcgNC4zIDQgNC41IDEuMi4xIDIuMi0uMyAzLjEtMS4xLjgtLjcgMS4zLTEuNyAxLjQtMi45bC41LTguNGMuMS0yLjQtMS43LTQuNC00LTQuNXoiPjwvcGF0aD4NCiAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNOTQuNCA0Ny4xYy0yLjMtLjEtNC4zIDEuNy00LjUgNGwtLjUgOC40Yy0uMSAyLjMgMS43IDQuMyA0IDQuNSAxLjIuMSAyLjItLjMgMy4xLTEuMS44LS43IDEuMy0xLjcgMS40LTIuOWwuNS04LjRjLjEtMi40LTEuNy00LjQtNC00LjV6Ij48L3BhdGg+DQogICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9InN0NSIgZD0iTTY1LjQgMS43Yy0yLjMtLjEtNC4zIDEuNy00LjUgNGwtLjUgOC40Yy0uMSAyLjMgMS43IDQuMyA0IDQuNSAxLjIuMSAyLjItLjMgMy4xLTEuMXMxLjMtMS43IDEuNC0yLjlsLjUtOC40Yy4xLTIuMy0xLjctNC4zLTQtNC41eiI+PC9wYXRoPg0KICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzPSJzdDUiIGQ9Ik0xNTcuMi02MS44bC02LjIgNS42Yy0xLjcgMS42LTEuOSA0LjItLjMgNiAxLjYgMS43IDQuMiAxLjkgNiAuM2w2LjItNS42YzEuNy0xLjYgMS45LTQuMi4zLTZzLTQuMy0xLjktNi0uM3oiPjwvcGF0aD4NCiAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNOTMuOC0yMy4zbC04LjMtLjVjLTIuMy0uMS00LjMgMS43LTQuNSA0czEuNyA0LjMgNCA0LjVsOC4zLjVjMS4yLjEgMi4yLS4zIDMuMS0xLjEuOC0uNyAxLjMtMS43IDEuNC0yLjkuMS0yLjQtMS43LTQuNC00LTQuNXoiPjwvcGF0aD4NCiAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz0ic3Q1IiBkPSJNMTg5LjEtMzUuMWwtOC4zLS41Yy0yLjMtLjEtNC4zIDEuNy00LjUgNHMxLjcgNC4zIDQgNC41bDguMy41YzEuMi4xIDIuMi0uMyAzLjEtMS4xczEuMy0xLjcgMS40LTIuOWMuMS0yLjQtMS42LTQuNC00LTQuNXoiPjwvcGF0aD4NCiAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNMTMyLjQtNDIuM2wtNy4xLTQuNGMtMi0xLjItNC42LS42LTUuOCAxLjQtMS4yIDItLjYgNC42IDEuNCA1LjhsNy4xIDQuNGMxIC42IDIuMS44IDMuMi41IDEuMS0uMiAyLS45IDIuNi0xLjkgMS4xLTIgLjUtNC42LTEuNC01Ljh6Ij48L3BhdGg+DQogICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9InN0NSIgZD0iTTg4LjIgNS43Yy0yLjEgMS4xLTIuOCAzLjctMS43IDUuN2w0IDcuNGMxLjEgMi4xIDMuNyAyLjggNS43IDEuNyAxLjEtLjYgMS44LTEuNiAyLjEtMi43LjMtMSAuMS0yLjEtLjQtM2wtNC03LjRjLTEuMS0yLTMuNy0yLjgtNS43LTEuN3oiPjwvcGF0aD4NCiAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgICA8ZyBjbGFzcz0iaGFpciI+DQogICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9InN0NSIgZD0iTTIzMi41LTgzLjNjLTIuMiAzLjEtNC42IDYtNy4yIDguNy0xLjggMS45LTEuNyA0LjkuMSA2LjcgMS45IDEuOCA0LjkgMS43IDYuNy0uMSAyLjktMyA1LjYtNi4zIDgtOS43IDEuNS0yLjEgMS01LjEtMS4xLTYuNnMtNS0xLjEtNi41IDF6Ij48L3BhdGg+DQogICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9InN0NSIgZD0iTTE0NC43LTExMy40Yy4yIDMuNy4yIDcuNS0uMiAxMS4yLS4yIDIuNiAxLjcgNC45IDQuMyA1LjEgMi42LjIgNC45LTEuNyA1LjEtNC4zLjQtNC4yLjQtOC40LjItMTIuNi0uMi0yLjYtMi40LTQuNi01LTQuNC0yLjUuMS00LjUgMi40LTQuNCA1eiI+PC9wYXRoPg0KICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzPSJzdDUiIGQ9Ik01OS4zLTc1LjdjMy4xIDIuMiA2IDQuNSA4LjcgNy4xIDEuOSAxLjggNC45IDEuNyA2LjctLjJzMS43LTQuOS0uMi02LjdjLTMtMi45LTYuMy01LjUtOS44LTgtMi4xLTEuNS01LjEtMS02LjYgMS4xcy0xIDUuMiAxLjIgNi43eiI+PC9wYXRoPg0KICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzPSJzdDUiIGQ9Ik0yMi42IDExLjZjMy43LS4yIDcuNS0uMSAxMS4yLjMgMi42LjMgNC45LTEuNiA1LjItNC4ycy0xLjYtNC45LTQuMi01LjJjLTQuMi0uNC04LjQtLjUtMTIuNi0uMy0yLjYuMS00LjYgMi4zLTQuNSA0LjkuMSAyLjcgMi4zIDQuNyA0LjkgNC41eiI+PC9wYXRoPg0KICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzPSJzdDUiIGQ9Ik02MC4yIDEwMi4yYzIuMi0zIDQuNi01LjkgNy4yLTguNiAxLjgtMS45IDEuOC00LjktLjEtNi43LTEuOS0xLjgtNC45LTEuOC02LjcuMS0yLjkgMy01LjYgNi4zLTguMSA5LjctMS41IDIuMS0xIDUuMSAxLjEgNi42IDIuMSAxLjQgNSAxIDYuNi0xLjF6Ij48L3BhdGg+DQogICAgICAgICAgICAgIDwvZz4NCiAgICAgICAgICAgICAgPGNpcmNsZSBpcz0idXBwZXJfY2lyY2xlIiBjbGFzcz0ic3Q2IiBjeD0iMTQ5LjEiIGN5PSIxNSIgcj0iOTkuNCI+PC9jaXJjbGU+DQogICAgICAgICAgICAgIDxnIGlkPSJzaWRlX3N3aXJsIj4NCiAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz0ic3Q3IiBkPSJNMTkyLjUgNS42YzQuMi00LjQgOS42LjUgMTMuNiAyLjkgNCAyLjMgNy45IDMuNCAxMi40IDIuMyA4LjctMS45IDEzLjktOS45IDEwLjItMTguNS0xLjktNC40LTUuNS03LjQtOS41LTkuOC0yLjMtMS40LTUuNS0yLjUtNy00LjktMi42LTQuMSAyLjYtNS42IDUuNy00LjQgNC42IDEuNyA4LjMgMy4xIDEzLjIgMS40IDMuNS0xLjIgNy42LTEuNiA4LjItNi4xLjctNS4zLTcuNC03LjYtOC4xLTIuMi0uMS4yLS4xLjUtLjIuNy44LS42IDEuNy0xLjMgMi41LTEuOS0xLjYuNi0zLjMgMS00LjkgMS41LTMuMiAxLTUuMi0uMS04LTEuMy00LjItMS42LTguNy0xLjYtMTIuNi45LTguOSA1LjktNC42IDE2LjYgMi44IDIxLjMgMy45IDIuNSAxMC4zIDQuNyAxMC41IDEwLjIuMiA2LjEtNy42IDUuNy0xMS4yIDMuNi03LjctNC41LTE2LjItOS4zLTIzLjctMS42LTMuNiAzLjkgMi4zIDkuOCA2LjEgNS45eiI+PC9wYXRoPg0KICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzPSJzdDciIGQ9Ik0xMzIuNSA1Ni4xYy0uOSAzLjgtLjUgNy41IDEuMyAxMSAxLjggMy42IDcuOCA4IDcuNiAxMi4xLS4xIDMuMS0yLjggNC4xLTUuNSAzLjVzLTQuMi0yLjMtNS43LTQuNWMtMi4zLTMuMy00LjUtNi42LTguMi04LjUtNi43LTMuNS0xNS44LTMtMTkuNCA0LjQtMS44IDMuNy0yLjEgOC4xLS45IDEyLjEuNyAyLjMgMiA0LjMgMy4zIDYuMy43IDEuMiAxLjYgMi4yIDEuMyAzLjctLjQgMS43LTEuMyAxLjYtMy4xIDEuOC01LjMuNi01LjQgOSAwIDguNCA0LS41IDguMi0xLjMgMTAuNS00LjkgMi4zLTMuNyAxLjQtOC4xLS42LTExLjctMS40LTIuNi0zLjUtNC45LTMuNy03LjktLjMtNC4yIDIuMi02LjQgNi4yLTUuNSA1LjggMS4zIDcuMiA3LjIgMTEuMSAxMSA1LjcgNS41IDE3LjQgNS45IDIxLjQtMS43IDIuMS0zLjkgMi4yLTguNy4xLTEyLjYtMi41LTQuNi05LTguOC03LjYtMTQuNiAxLjItNS40LTYuOS03LjctOC4xLTIuNHoiPjwvcGF0aD4NCiAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz0ic3Q3IiBkPSJNMTM4LjItMjBjMTMuNC0yLjkgMjcuNi0uNyAzNy41IDkuNCA3LjggOCAxMS44IDE5LjYgMTAuMiAzMC43LTMuOSAyNy40LTM3LjUgMzkuNC01OC40IDIyLTEyLjItMTAuMi0xNC4yLTI1LjktMTAuNC00MC42IDEuNC01LjYtNy4yLTgtOC43LTIuNC00LjIgMTYuMy0yLjQgMzMuNyA5LjYgNDYuNCA5LjMgOS45IDIzLjYgMTUuMiAzNy4xIDEzLjggMTcuNS0xLjggMzIuNi0xMy45IDM4LjEtMzAuNyA0LjYtMTMuOSAxLjQtMjkuNy03LjQtNDEuMy0xMS45LTE1LjctMzEuMy0yMC00OS45LTE2LTUuNyAxLjItMy4zIDkuOSAyLjMgOC43eiI+PC9wYXRoPg0KICAgICAgICAgICAgICAgIDxwYXRoIGNsYXNzPSJzdDUiIGQ9Ik05OS4zLTU0LjhsLTggMi40Yy0yLjIuNy0zLjUgMy0yLjkgNS4yLjcgMi4yIDMgMy41IDUuMiAyLjlsOC0yLjRjMS4xLS4zIDItMS4xIDIuNS0ycy43LTIuMS4zLTMuMmMtLjUtMi4yLTIuOS0zLjUtNS4xLTIuOXoiPjwvcGF0aD4NCiAgICAgICAgICAgICAgICA8cGF0aCBjbGFzcz0ic3Q0IiBkPSJNODEuOCAzMC43aC0uMmMtMy4yLjYtNC45IDQuNy0xLjggNy43IDIuMSAxLjIgNC4xLjggNS40LS40IDEtLjkgMS42LTIuMyAxLjQtMy43LS40LTIuMy0yLjUtMy45LTQuOC0zLjZ6Ij48L3BhdGg+DQogICAgICAgICAgICAgICAgPHBhdGggY2xhc3M9InN0NyIgZD0iTTEyNC4zLTIxLjdjLTMuMiAxLjctNi4xIDQuMy04LjMgNy4xLTEuNCAxLjgtMS4xIDQuOS44IDYuMyAyIDEuNSA0LjcgMS4xIDYuMy0uOC40LS41LjgtLjkgMS4yLTEuNGwuMS0uMWMuMi0uMy42LS41LjgtLjguNi0uNCAxLS45IDEuNi0xLjMuMy0uMy42LS40LjktLjYuOC0uNS0uNi4zLjEtLjEgMi0xLjEgMy41LTMuNiAyLjMtNi0uOS0yLTMuNS0zLjUtNS44LTIuM3oiPjwvcGF0aD4NCiAgICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgPC9zdmc+&logoColor=black">

<img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black"> <img src="https://img.shields.io/badge/uuid-00AEF0?style=for-the-badge&logo=&logoColor=black">

<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=black">
<img src="https://img.shields.io/badge/vercel-A5915F?style=for-the-badge&logo=vercel&logoColor=white">

## 페이지 구성

- 인트로 페이지
- 동행찾기 페이지
  - 작성/수정 페이지
- 스팟공유 페이지
  - 작성/수정 페이지
- 회원가입
- 로그인
- 마이페이지

## 깃 플로우 전략

- `main`
- `dev`
- `feat`
  - header
  - footer
  - common
  - myPage
  - spotShare
  - partnerPost

1. 본인 기능 구현한 브랜치 push 하기 → `git push origin feat/comments`
2. 본인 기능 구현한 브랜치에 dev 브랜치 pull 받기 → `git pull origin dev`
3. 충돌 있으면 해결 후 본인 브랜치에 push 함 → `git push origin feat/comments`
4. 본인 브랜치에서 dev로 PR 날림
5. PR 리뷰 후, 2명 이상 승인 시 merge 버튼 활성화

## 커밋 컨벤션

- Feat: 새로운 기능 추가
- Fix: 버그 수정
- Docs: 문서 변경
- Style: 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우
- Refactor: 코드 리팩토링 (변수명 변경 등)
- Chore: 설정 변경 등 기타 변경사항
- Design: HTML, CSS 등 사용자 UI 디자인 변경
- Resolve: 충돌 해결

## 코드 컨벤션

#### 컴포넌트 파일명은 _파스칼 케이스_ 로 작성합니다.

```tsx
Companion.tsx;
```

#### 컴포넌트를 제외한 폴더, 파일명은 _카멜 케이스_ 로 작성합니다.

```tsx
// 폴더명
api;
components;

// 파일명 (컴포넌트 이외)
configStore.ts;
index.ts;
```

#### 함수명, 변수명은 _카멜 케이스_ 로 작성합니다.

```tsx
// 함수명
const findCompanion = () => {};

// 변수명
const [name, setName] = useState('');
let joinedCompanion = [john, karina];
```

#### 클래스명은 _케밥 케이스_ 로 작성합니다.

```tsx
<h1 class="main-title">동행 구함</h1>
```

#### Styled-Components를 적용한 html 태그명은 아래와 같이 작성합니다.

- 스타일 파일 import

```tsx
import * as St from ‘./경로'
```

- 각 html 태그명

```tsx
div: '컴포넌트명' Box
section : '컴포넌트명'Section
ul : '컴포넌트명' List
li : '컴포넌트명' Item
p : '컴포넌트명' Paragraph
span : '컴포넌트명' Span
```

#### 스타일 코드의 순서는 아래와 같이 작성합니다.

```ts
.sample {
  /* position 관련 */
  position: absolute;
  top: 0;
  left: 0;

  /* display 관련 */
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  /* size 관련 */
  width: auto;
  height: auto;

  /* margin, padding */
  margin: 0 auto;
  padding: 12px;

  /* background 관련 */
  background-color: #ffffff;

  /* border 관련 */
  border: 1px solid #ffffff;
  border-radius: 12px;

  /* font 관련 */
  font-size: 24px;
  font-weight: 700;
  text-align: center;

  /* animation 관련 */
  transform: translate(10px, 100%);
  transition: 300ms;
}
```

## 코드 컨벤션

### 폴더, 파일명

컴포넌트 파일명은 파스칼 케이스(PascalCase)를 사용한다.

```ts
MainComponent.jsx;
Route.jsx;
```

컴포넌트를 제외한 폴더, 파일명은 카멜 케이스(camelCase)를 사용한다.

```ts
components;
modules;
configStore.js;
```

### 함수

함수명은 카멜 케이스(camelCase)를 원칙으로 한다.

```ts
function nameOfFunction() {
  // ...some logic
}
```

### 변수명

상수는 모두 대문자로 쓰며 띄어쓰기는 \_로 처리하며, 객체타입의 경우 카멜 케이스를 적용한다.

```ts
const SOME_VALUE = 1;

const people = {
  name: '김자바',
  age: '26',
};
```

### 클래스명

클래스명은 케밥 케이스(kebab-case)를 원칙으로 한다.

```html
<h1 class="main-title">오늘 메뉴 추천</h1>
```
