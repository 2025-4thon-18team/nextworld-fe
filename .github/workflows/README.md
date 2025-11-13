# GitHub Actions Workflows

## 배포 설정 가이드

### 1. GitHub Pages 설정

1. GitHub 리포지토리로 이동
2. Settings > Pages로 이동
3. Source를 "GitHub Actions"로 선택

### 2. GitHub Secrets 설정

다음 환경변수를 GitHub Secrets에 추가하세요:

- `VITE_SERVER_URL`: 백엔드 서버 URL (필수)
- `VITE_APP_ENV`: 앱 환경 (선택, 기본값: 'production')
- `VITE_ENABLE_LOCATOR`: Locator 활성화 여부 (선택, 기본값: 'false')

**설정 방법:**
1. GitHub 리포지토리로 이동
2. Settings > Secrets and variables > Actions로 이동
3. "New repository secret" 클릭
4. Name과 Value 입력 후 저장

### 3. 배포 트리거

- `main` 또는 `dev` 브랜치에 push 시 자동 배포
- GitHub Actions 탭에서 수동 실행 가능 (workflow_dispatch)

### 4. 배포 확인

배포가 완료되면 다음 URL에서 확인할 수 있습니다:
- `https://[username].github.io/nextworld-fe/`

