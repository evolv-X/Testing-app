import fs from 'fs';
import path from 'path';

// Получаем путь к папке src/api относительно корня проекта
const apiDir = path.join(process.cwd(), 'src', 'api');

function fixImports() {
  if (!fs.existsSync(apiDir)) {
    console.log('Папка src/api не найдена');
    return;
  }

  const files = fs.readdirSync(apiDir).filter(f => f.endsWith('.ts') && f !== 'data-contracts.ts' && f !== 'http-client.ts');

  for (const file of files) {
    const filePath = path.join(apiDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    let changed = false;

    // Заменяем импорты из ./data-contracts
    if (content.includes('from "./data-contracts"')) {
      content = content.replace(/import\s+{([^}]+)}\s+from\s+"\.\/data-contracts";/g, 'import type { $1 } from "./data-contracts";');
      changed = true;
    }

    // Фиксим импорты типов из ./http-client
    if (content.includes('from "./http-client"')) {
      content = content.replace(/import\s+{([^}]+)}\s+from\s+"\.\/http-client";/g, (match, p1) => {
        const parts = p1.split(',').map(s => s.trim()).filter(Boolean);
        const typesList = ['RequestParams', 'FullRequestParams', 'ApiConfig', 'QueryParamsType'];
        const newParts = parts.map(p => {
           if (typesList.includes(p) && !p.startsWith('type ')) return `type ${p}`;
           return p;
        });
        return `import { ${newParts.join(', ')} } from "./http-client";`;
      });
      changed = true;
    }

    if (changed) {
      fs.writeFileSync(filePath, content);
      console.log(`Пофиксил импорты в ${file}`);
    }
  }
}

fixImports();
