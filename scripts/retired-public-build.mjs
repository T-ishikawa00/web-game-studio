export function retiredPublicBuild(){
 throw new Error('Legacy public build retired. Use node scripts/trust-ux-build.mjs for local R2 review; release requires a new Human-authorized task.');
}
