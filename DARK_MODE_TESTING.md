# Dark Mode Testing Guide

## Quick Test Steps

### 1. **Access the Application**
- Open your browser to: `http://localhost:3001/`
- The application should load in light mode by default (or your system preference)

### 2. **Toggle Dark Mode**
1. Look at the top-right corner of the header (blue bar)
2. Click the "Dark Mode" button with moon icon 🌙
3. The entire page should smoothly transition to dark mode
4. The button should now show "Light Mode" with sun icon ☀️

### 3. **Verify Theme Persistence**
1. Toggle to dark mode
2. Refresh the page (F5 or Ctrl+R)
3. Dark mode should remain active
4. Toggle back to light mode and refresh again
5. Light mode should remain active

### 4. **Test Visual Elements**

#### Homepage Elements to Check:
- ✅ **Header** - Blue navigation bar with proper contrast
- ✅ **Hero Section** - Dark gradient background with readable text
- ✅ **Quick Links Cards** - Dark card backgrounds with icons
- ✅ **Latest Updates** - Dark card with readable update items
- ✅ **Key Services** - Service cards with proper backgrounds
- ✅ **Data Section** - Statistics cards and category cards
- ✅ **Footer** - Dark footer (already had dark styling)

#### Navigation Test:
1. Click "About Us" in the header
   - Page background should be dark
   - Statistics cards should have dark backgrounds
   - Organization table should be readable
   
2. Click "Contact" in the header
   - Form inputs should have dark backgrounds
   - Form labels should be white/light gray
   - Regional office cards should display properly
   
3. Click "Projects" in the header
   - Search input should be dark
   - Project cards should be readable

### 5. **Interactive Element Tests**

#### Hover States:
- Hover over Quick Links cards - should show lift effect
- Hover over Latest Updates items - should show highlight
- Hover over form inputs - should show focus ring
- Hover over buttons - should show darker/lighter shade

#### Focus States:
- Tab through interactive elements
- Focus rings should be visible in both modes
- Focus rings should use blue color

### 6. **Accessibility Check**

#### Contrast:
- All text should be easily readable
- No elements should blend into background
- Links should be distinguishable from regular text

#### Color Blind Testing:
- Information should not rely solely on color
- Icons and labels should provide context

### 7. **Responsive Design Test**

1. **Desktop** (1920x1080):
   - Toggle theme
   - Verify all sections display correctly
   
2. **Tablet** (768x1024):
   - Resize browser window
   - Toggle theme
   - Check mobile menu in dark mode
   
3. **Mobile** (375x667):
   - Use browser dev tools
   - Toggle theme
   - Verify mobile navigation is readable

## What to Look For

### ✅ Good Signs:
- Smooth transitions (no jarring color changes)
- All text is readable
- Consistent color scheme throughout
- No white flashes when changing pages
- Theme persists across page refreshes
- System theme preference is respected

### ❌ Issues to Report:
- Text that's hard to read
- White backgrounds in dark mode
- Elements that don't change color
- Flickering during theme switch
- Console errors
- Layout shifts

## Common Test Scenarios

### Scenario 1: First-Time User
```
1. Open application (no stored preference)
2. Application uses system preference
3. Toggle theme
4. Preference is saved
5. Refresh page
6. Custom preference is used
```

### Scenario 2: Returning User
```
1. Open application (has stored preference)
2. Application loads with saved theme
3. Theme matches last selection
```

### Scenario 3: System Theme Change
```
1. Open application in light mode
2. Change OS to dark mode
3. Open new tab/window
4. New tab should use dark mode
```

## Browser-Specific Tests

### Chrome/Edge:
- Open DevTools (F12)
- Check Console for errors
- Use Lighthouse for accessibility score
- Verify no memory leaks on theme toggle

### Firefox:
- Check color contrast
- Verify CSS variables work
- Test performance

### Safari:
- Verify gradient backgrounds display
- Check smooth transitions
- Test on actual iOS device if available

## Performance Checks

1. **Theme Toggle Speed**:
   - Should be instant (<100ms)
   - No layout reflow
   - No content shift

2. **Page Load**:
   - No flash of wrong theme
   - Theme applied before first paint

3. **Memory**:
   - Toggle theme 20+ times
   - Check DevTools memory usage
   - Should remain stable

## Automated Testing Commands

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Known Limitations

1. **Images**: Some images may not have dark variants
2. **Charts**: Data visualizations use fixed colors (future enhancement)
3. **Print**: Print styles not yet optimized for dark mode

## Report Template

When reporting issues, include:

```
**Environment:**
- Browser: [Chrome/Firefox/Safari]
- Version: [e.g., Chrome 120]
- OS: [Windows/Mac/Linux]
- Screen: [1920x1080, etc.]

**Issue:**
[Description of the problem]

**Steps to Reproduce:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Expected Result:**
[What should happen]

**Actual Result:**
[What actually happened]

**Screenshot:**
[If applicable]
```

## Quick Visual Checklist

### Light Mode ☀️
- [ ] White/light gray backgrounds
- [ ] Dark text (gray-900)
- [ ] Blue accents
- [ ] Subtle shadows
- [ ] Light borders

### Dark Mode 🌙
- [ ] Dark slate backgrounds (slate-900, slate-800)
- [ ] White/light text
- [ ] Bright blue accents (blue-400)
- [ ] Darker shadows
- [ ] Darker borders (slate-700)

## Success Criteria

The dark mode implementation is successful when:

✅ All text is readable with WCAG AA contrast (4.5:1 minimum)
✅ Theme toggle works smoothly without flicker
✅ Theme preference persists across sessions
✅ All interactive elements are usable in both modes
✅ No visual bugs or layout issues
✅ Performance remains fast
✅ All pages support dark mode consistently

## Next Steps After Testing

1. Fix any issues found during testing
2. Update remaining page components
3. Add dark mode to data visualizations
4. Optimize images for both modes
5. Add print styles for dark mode
6. Consider additional theme options

---

**Happy Testing! 🚀**

For questions or to report issues, contact the development team.
