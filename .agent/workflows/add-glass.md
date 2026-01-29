---
description: Add a new experience/template to the platform
---

# Add Glass Workflow

Create a new visual template component.

## Steps

1. **Create the template file:**
   ```
   src/components/templates/[TemplateName].tsx
   ```

2. **Use the skeleton:**
   ```tsx
   import React from 'react';
   import { notifyTele } from '@/utils/acknowledgmentHelpers';
   import { useSound } from '@/hooks/useSound';

   interface Props {
     // Define props
   }

   export const TemplateName: React.FC<Props> = ({ ...props }) => {
     const { playClick } = useSound();

     const handleAction = (actionPhrase: string) => {
       playClick();
       notifyTele(actionPhrase);
     };

     return (
       <div className="glass-template-container">
         {/* Template content */}
       </div>
     );
   };
   ```

3. **Register in `src/data/templateRegistry.ts`**

4. **Add schema to `public/prompts/glass-prompt.md`**

5. **Verify:** `npx tsc --noEmit`

## Rules

- Every clickable calls `notifyTele(actionPhrase)`
- Use centralized CSS classes from `src/index.css`
- Use Smart Image for AI-generated visuals

---

_The Screen Finally Cares_
